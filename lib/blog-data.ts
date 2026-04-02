// Shared blog data — imported by blog listing, detail pages, preview section, and admin
export type BlogPost = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  date: string;
  readTime: string;
  image: string;
  author: { name: string; role: string; avatar: string };
  status: "Published" | "Draft" | "Archived";
  views: number;
};

export const blogPosts: BlogPost[] = [
  {
    id: "montessori-at-home",
    title: "5 Montessori activities you can set up at home this weekend",
    category: "Montessori",
    excerpt: "You don't need expensive materials. A tray, some dried beans, and a spoon are enough to keep a toddler meaningfully engaged for hours.",
    body: [
      "The core principle of Montessori at home is the same as in the classroom: prepare a purposeful environment that invites independent exploration. The good news? You already have most of what you need.",
      "**1. The Pouring Station.** Fill two small pitchers with dried beans or rice. Let your child pour from one to the other. This develops concentration, fine motor control, and a sense of mastery — all from a kitchen utensil.",
      "**2. The Object Sorting Tray.** Gather five to ten small household objects of different materials — a coin, a stone, a button, a piece of fabric. Invite your child to sort them by feel, size, or colour. There is no wrong answer.",
      "**3. The Practical Life Corner.** Give your toddler a real sponge and a small bowl of water. Show them how to squeeze and soak. Children absolutely love real tasks with real consequences — and it builds enormous independence.",
      "**4. The Nature Table.** Collect leaves, seeds, and pebbles on a walk and arrange them on a dedicated low table. Rotate the collection weekly. This quietly cultivates scientific curiosity and observation skills.",
      "**5. The Art Invitation.** Set out three colours of paint, a large sheet of paper, and a brush — then step back. The best thing you can do is resist the urge to guide. Creative freedom at this stage is deeply formative.",
      "The key is consistency over intensity. Even thirty focused minutes a day in a prepared environment yields extraordinary results over time. You are not just keeping your child busy — you are shaping how they think.",
    ],
    date: "Feb 28, 2026",
    readTime: "4 min read",
    image: "/images/child_10.jpg",
    author: { name: "Amaka Osei-Bonsu", role: "Lead Montessori Guide", avatar: "A" },
    status: "Published",
    views: 1240,
  },
  {
    id: "screen-time-guide",
    title: "The research-backed guide to screen time for children under 5",
    category: "Child Development",
    excerpt: "The latest WHO and AAP guidelines distilled into a practical framework for Nigerian parents navigating the digital age.",
    body: [
      "The question is no longer whether screens are present in your child's life — they are. The question is how to use them intentionally, and when to keep them away entirely.",
      "**The WHO and AAP consensus.** For children under 18 months, the recommendation is clear: no screen time except video calls with family. For ages 2 to 5, the limit is one hour per day of high-quality, co-viewed content. These are not arbitrary figures — they reflect consistent findings across hundreds of developmental studies.",
      "**What the research actually says.** Passive screen consumption before age two has been linked to delayed language acquisition, reduced attention span, and disrupted sleep architecture. The developing brain in the first two years is wiring its neural pathways at an extraordinary rate — and it does this through rich sensory, social, and physical interaction, not through pixels.",
      "**A framework for Nigerian families.** Many Nigerian parents face unique pressures. Devices are often used as pacifiers during busy cooking hours or commutes. The goal is not to eliminate this entirely but to create clear boundaries: screens off during meals, screens off one hour before bed, and always — always — watched with a parent whenever possible.",
      "**What to do instead.** A singing game, a story told from memory, a short walk, a bowl of playdough. These are not lesser alternatives to screens — they are cognitively superior ones. The research on imaginative play versus passive viewing is unambiguous.",
      "The most powerful thing a parent can do is model an intentional relationship with their own devices. Children are extraordinary observers. They will follow your lead.",
    ],
    date: "Feb 20, 2026",
    readTime: "6 min read",
    image: "/images/child_12.jpg",
    author: { name: "Dr. Emeka Nwosu", role: "Paediatric Development Consultant", avatar: "E" },
    status: "Published",
    views: 893,
  },
  {
    id: "choosing-first-school",
    title: "What to look for when choosing your child's very first school",
    category: "Parenting",
    excerpt: "From caregiver ratios to classroom design philosophy — here is a practical checklist every parent should have.",
    body: [
      "Choosing a first school is one of the most consequential decisions of early parenthood. It will shape not just your child's academic start, but their relationship with learning itself. Here is what actually matters.",
      "**1. Caregiver-to-child ratio.** This is the single most important metric. For children under 3, you want a maximum ratio of 1:5. For 3-to-6-year-olds, 1:8 is acceptable. Any number beyond this is a red flag, regardless of how beautiful the facility looks.",
      "**2. The environment, not just the brochure.** Walk in unannounced if you can, or arrive early for your tour. What is the noise level? Are children engaged and purposeful, or chaotic? Are learning materials accessible at child height? Is there natural light?",
      "**3. The philosophy behind the curriculum.** Ask directly: 'What is your approach to discipline?' and 'How do you handle a child who is struggling to settle?' The answers reveal far more than a curriculum overview document ever will.",
      "**4. The teacher's posture.** Watch how caregivers move around the classroom. Do they crouch down to a child's eye level? Do they speak softly? Do they intervene immediately in every conflict, or do they give children space to navigate challenges? The last question is particularly telling.",
      "**5. Parent communication.** How often will you receive updates? Is there a portal, a weekly note, a termly conference? Schools that invest in parent communication tend to invest equally in the child.",
      "Trust your instincts. After visiting three or four schools, you will have a visceral sense of where your child belongs. That sense is data — treat it accordingly.",
    ],
    date: "Feb 14, 2026",
    readTime: "5 min read",
    image: "/images/child_14.jpg",
    author: { name: "Chioma Adeyemi", role: "Early Childhood Education Specialist", avatar: "C" },
    status: "Published",
    views: 2100,
  },
  {
    id: "bilingual-benefits",
    title: "The surprising cognitive benefits of bilingual early education",
    category: "Child Development",
    excerpt: "Research now confirms what multilingual families have always known: raising children with two languages gives them a lifelong cognitive edge.",
    body: [
      "For years, a well-meaning but incorrect myth persisted in parenting circles: that exposing young children to two languages simultaneously would confuse them, delay speech, or cause academic difficulty. The research has now definitively dismantled this myth.",
      "**What bilingualism actually does to the brain.** Children raised in bilingual environments develop what researchers call 'executive function' skills earlier and more robustly than monolingual peers. These include the ability to focus attention, switch between tasks, and inhibit irrelevant information — precisely the skills that predict academic and professional success.",
      "**The Nigerian context.** Nigeria is one of the most linguistically rich countries on earth, with over 500 languages. Most Nigerian children are already navigating multiple languages — Yoruba, Igbo, Hausa, Pidgin, and English — often without formal instruction. This natural environment is a profound cognitive asset that many parents undervalue.",
      "**Practical guidance.** The 'one parent, one language' approach works well for families with two native languages. For school environments, a deliberate policy of instruction in the mother tongue alongside English from age 3 onwards has shown measurable advantages in literacy acquisition.",
      "The takeaway is simple: do not shy away from your language. Singing to your child in Yoruba, telling stories in Igbo, reading in Hausa — these are not obstacles to English fluency. They are its foundation.",
    ],
    date: "Mar 3, 2026",
    readTime: "7 min read",
    image: "/images/child_15.avif",
    author: { name: "Dr. Emeka Nwosu", role: "Paediatric Development Consultant", avatar: "E" },
    status: "Draft",
    views: 0,
  },
  {
    id: "play-based-learning",
    title: "Why unstructured play is the most important part of your child's day",
    category: "Montessori",
    excerpt: "In a world obsessed with structured enrichment, the most powerful thing you can give a child is open time with nothing to do.",
    body: [
      "There is an invisible pressure on modern Nigerian parents to fill every hour of their child's life with enrichment: coding classes, swimming lessons, Kumon, phonics apps. And in doing so, they are inadvertently depriving their children of the single most powerful developmental activity available — unstructured free play.",
      "**What 'unstructured' actually means.** This is not screen time. It is not a playdate with instructions. It is a child with open time, open materials — sand, blocks, fabric, cardboard — and the freedom to direct their own activity entirely.",
      "**The developmental science.** Unstructured play is where children develop what developmental psychologists call 'self-regulation' — the ability to manage their own emotions, motivations, and impulses. It is also where symbolic thinking, narrative intelligence, and social cognition are most actively formed. No structured lesson achieves this as effectively.",
      "**The problem with too many activities.** Children who are overscheduled show higher rates of anxiety, lower creativity scores, and less intrinsic motivation by middle childhood. The correlation is consistent across cultures. Boredom, it turns out, is where creativity lives.",
      "**A simple prescription.** One hour each day of uninterrupted, child-directed play — outdoors if possible. No agenda, no instructions, no performance goals. Just presence and freedom. Watch what they build, what stories they tell, what problems they solve. You will be astonished.",
      "The most radical thing a parent can do right now is give their child the gift of doing nothing in particular. That gift has a name: childhood.",
    ],
    date: "Mar 5, 2026",
    readTime: "5 min read",
    image: "/images/child_16.jpg",
    author: { name: "Amaka Osei-Bonsu", role: "Lead Montessori Guide", avatar: "A" },
    status: "Draft",
    views: 0,
  },
];
