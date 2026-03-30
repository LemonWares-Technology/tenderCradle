import { Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LocalImageDropzone } from "@/components/admin/local-image-dropzone";
import { getCategories, type Category } from "@/lib/api/categories";
import { createProduct, updateProduct, adminGetProduct, updateVariantStock, type Product } from "@/lib/api/products";
import { uploadAdminImage } from "@/lib/api/upload";

const PLACEHOLDER_IMG = "/images/placeholder-product.png";

function slugifyProductName(name: string): string {
  const s = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
  return s || "product";
}

function uniqueSkuPart(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
}

/** Keep only URLs already stored server-side (never data: blobs in state). */
function sanitizeServerImages(urls: string[] | undefined): string[] {
  if (!urls?.length) return [];
  return urls.filter((u) => typeof u === "string" && u.length > 0 && !u.startsWith("data:"));
}

export function UploadProductForm({ isEdit = false, productId }: { isEdit?: boolean; productId?: string }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(isEdit);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [variantSku, setVariantSku] = useState("");
  const [variantId, setVariantId] = useState<string | null>(null);
  /** Image URLs already on the server (from API). */
  const [serverImages, setServerImages] = useState<string[]>([]);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    };
  }, [pendingPreview]);

  const loadCategories = useCallback(async () => {
    try {
      const list = await getCategories();
      setCategories(list.filter((c) => c.isActive));
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (!isEdit || !productId) {
      setLoadingProduct(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoadingProduct(true);
        const p: Product = await adminGetProduct(productId);
        if (cancelled) return;
        setName(p.name);
        setDescription(p.description);
        setSlug(p.slug);
        setSku(p.sku);
        const v0 = p.variants?.[0];
        if (v0) {
          setVariantId(v0.id);
          setVariantSku(v0.sku);
          setPrice(String(Number(v0.price)));
          setStock(String(v0.stock));
        } else {
          setVariantId(null);
        }
        setCategoryId(p.categoryId ?? "");
        setServerImages(sanitizeServerImages(p.images));
        setPendingFile(null);
        setPendingPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e && typeof e === "object" && "message" in e ? String((e as { message: string }).message) : "Failed to load product.";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoadingProduct(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isEdit, productId]);

  const handleImageFile = (file: File) => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
    setError(null);
  };

  const clearImagePending = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }
    const priceNum = parseFloat(price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setError("Enter a valid price greater than zero.");
      return;
    }
    const stockNum = parseInt(stock, 10);
    if (Number.isNaN(stockNum) || stockNum < 0) {
      setError("Enter a valid stock quantity (0 or more).");
      return;
    }

    try {
      setSubmitting(true);

      let imagePayload: string[];
      if (pendingFile) {
        const uploaded = await uploadAdminImage(pendingFile);
        imagePayload = [uploaded, ...serverImages.slice(1)];
      } else {
        imagePayload = serverImages.length > 0 ? [...serverImages] : [PLACEHOLDER_IMG];
      }

      if (isEdit && productId) {
        await updateProduct(productId, {
          name: name.trim(),
          slug: slug.trim() || slugifyProductName(name),
          sku: sku.trim(),
          description: description.trim(),
          images: imagePayload,
          categoryId: categoryId || null,
          isActive: true,
        });
        if (variantId) {
          await updateVariantStock(productId, variantId, { stock: stockNum });
        }
      } else {
        const newSlug = slugifyProductName(name);
        const productSku = `TC-${uniqueSkuPart()}`;
        const vSku = `${productSku}-V`;
        await createProduct({
          name: name.trim(),
          slug: newSlug,
          sku: productSku,
          description: description.trim(),
          images: imagePayload,
          categoryId: categoryId || undefined,
          isActive: true,
          variants: [
            {
              name: "Default",
              sku: vSku,
              price: priceNum,
              stock: stockNum,
            },
          ],
        });
      }
      navigate("/admin/products");
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Could not save product.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-[200px] gap-2 text-[#5F6368] text-sm">
        <Loader2 className="w-5 h-5 animate-spin text-[#1A73E8]" />
        Loading product…
      </div>
    );
  }

  const mediaPreviewUrl = pendingPreview ?? serverImages[0] ?? null;

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-lg border border-[#D93025] bg-[#FCE8E6] px-4 py-3 text-sm text-[#D93025]">{error}</div>
      )}

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">General Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Montessori Sorting Set"
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product..."
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm resize-none"
            />
          </div>

          {isEdit && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5F6368] mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F6368] mb-1">SKU</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm font-mono text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#5F6368] mb-1">Default variant SKU</label>
                <input
                  type="text"
                  value={variantSku}
                  onChange={(e) => setVariantSku(e.target.value)}
                  disabled
                  className="w-full px-4 py-2 bg-[#F8F9FA] border border-[#DADCE0] rounded text-[#5F6368] text-xs font-mono cursor-not-allowed"
                />
                <p className="text-xs text-[#5F6368] mt-1">Variant price and stock are shown below; variant SKU cannot be changed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">Media</h2>
        <p className="text-xs text-[#5F6368] -mt-2">
          Image stays in the browser until you save; then it uploads to the server and the product is saved with the new URL.
        </p>
        <LocalImageDropzone
          previewUrl={mediaPreviewUrl}
          pendingLabel={pendingFile?.name ?? null}
          onFile={handleImageFile}
          onClearPending={clearImagePending}
          hasPendingFile={!!pendingFile}
          emptySubtitle={
            isEdit
              ? "Optional — keep existing image or add one. New uploads run when you save."
              : "Optional — if you skip this, a placeholder is used until you add a real image."
          }
          onValidationError={(msg) => setError(msg)}
        />
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">Pricing & Inventory</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Price (₦)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              disabled={isEdit}
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm disabled:bg-[#F8F9FA] disabled:text-[#5F6368]"
            />
            {isEdit && (
              <p className="text-xs text-[#5F6368] mt-1">Variant price is fixed after creation; you can still adjust stock below.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Stock Quantity</label>
            <input
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="px-6 py-2.5 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors border border-transparent"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm disabled:opacity-60"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}
