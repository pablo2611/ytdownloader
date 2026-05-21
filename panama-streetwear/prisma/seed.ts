import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

type ColorOpt = { name: string; hex: string };

const COLORS: Record<string, ColorOpt> = {
  negro: { name: 'Negro', hex: '#0a0a0a' },
  blanco: { name: 'Blanco', hex: '#f4f4f4' },
  gris: { name: 'Gris', hex: '#6b7280' },
  militar: { name: 'Verde militar', hex: '#4b5320' },
  beige: { name: 'Beige', hex: '#d2b48c' },
  rojo: { name: 'Rojo', hex: '#b91c1c' },
  azul: { name: 'Azul marino', hex: '#1e3a8a' },
  mostaza: { name: 'Mostaza', hex: '#b45309' },
  crema: { name: 'Crema', hex: '#efe7d5' },
};

const SIZES_ROPA = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SIZES_SNEAKERS = ['38', '39', '40', '41', '42', '43', '44'];
const SIZES_ACCESORIOS = ['Única'];

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtCents?: number;
  imagesSeeds: string[]; // semillas para picsum como fallback estable
  unsplashIds?: string[]; // ids reales de unsplash si están disponibles
  colors: ColorOpt[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
};

function imgs(p: SeedProduct): string[] {
  if (p.unsplashIds && p.unsplashIds.length > 0) {
    return p.unsplashIds.map((id) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`);
  }
  return p.imagesSeeds.map((s) => `https://picsum.photos/seed/${s}/800/1000`);
}

type CatKey = 'camisetas' | 'hoodies' | 'pantalones' | 'chaquetas' | 'accesorios' | 'sneakers';

const CATEGORIES: Record<
  CatKey,
  { name: string; description: string; imageUrl: string; sizes: string[]; products: SeedProduct[] }
> = {
  camisetas: {
    name: 'Camisetas',
    description: 'Tees oversize, gráficas y básicas. Algodón pesado, caída suelta, vibra urbana.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_ROPA,
    products: [
      {
        slug: 'tee-oversize-507',
        name: 'Tee Oversize 507',
        description:
          'Camiseta oversize de algodón 240 gsm con estampado serigrafiado "507" en pecho. Caída ligera, hombros caídos, costura reforzada.',
        priceCents: 2200,
        imagesSeeds: ['507-tee-507-1', '507-tee-507-2', '507-tee-507-3'],
        unsplashIds: ['photo-1583743814966-8936f5b7be1a', 'photo-1576566588028-4147f3842f27', 'photo-1503342217505-b0a15ec3261c'],
        colors: [COLORS.negro, COLORS.blanco, COLORS.gris],
        stock: 35,
        featured: true,
        isNew: true,
      },
      {
        slug: 'tee-cumbia-tropical',
        name: 'Tee Cumbia Tropical',
        description:
          'Camiseta con gráfico vibrante inspirado en la cumbia panameña. 100% algodón premium, corte regular, manga corta.',
        priceCents: 2600,
        imagesSeeds: ['507-cumbia-1', '507-cumbia-2', '507-cumbia-3'],
        unsplashIds: ['photo-1622445275576-721325763afe', 'photo-1620799140408-edc6dcb6d633', 'photo-1554568218-0f1715e72254'],
        colors: [COLORS.blanco, COLORS.crema, COLORS.mostaza],
        stock: 22,
      },
      {
        slug: 'tee-istmo-graphic',
        name: 'Tee Istmo Graphic',
        description:
          'Estampado del mapa del istmo en frente, tipografía bold en la espalda. Algodón orgánico, lavado suave, calce relajado.',
        priceCents: 2400,
        imagesSeeds: ['507-istmo-1', '507-istmo-2', '507-istmo-3'],
        unsplashIds: ['photo-1562157873-818bc0726f68', 'photo-1618354691373-d851c5c3a990', 'photo-1556821840-3a63f95609a7'],
        colors: [COLORS.negro, COLORS.militar, COLORS.beige],
        stock: 28,
      },
      {
        slug: 'tee-basica-blackout',
        name: 'Tee Básica Blackout',
        description:
          'La esencial. Camiseta negra sin estampados, cuello redondo reforzado y costuras planas. Perfecta para layering.',
        priceCents: 1800,
        imagesSeeds: ['507-basica-1', '507-basica-2', '507-basica-3'],
        unsplashIds: ['photo-1571945153237-4929e783af4a', 'photo-1503341504253-dff4815485f1', 'photo-1581655353564-df123a1eb820'],
        colors: [COLORS.negro, COLORS.blanco, COLORS.gris, COLORS.militar],
        stock: 50,
      },
    ],
  },
  hoodies: {
    name: 'Hoodies & Sudaderas',
    description: 'Sudaderas pesadas con capucha, crewnecks y zip-ups. Listas para el clima del pacífico.',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_ROPA,
    products: [
      {
        slug: 'hoodie-casco-antiguo',
        name: 'Hoodie Casco Antiguo',
        description:
          'Sudadera con capucha 380 gsm, bordado discreto "Casco Antiguo" en el pecho. Interior afelpado, bolsillo canguro amplio.',
        priceCents: 5800,
        compareAtCents: 6900,
        imagesSeeds: ['507-casco-1', '507-casco-2', '507-casco-3', '507-casco-4'],
        unsplashIds: [
          'photo-1556821840-3a63f95609a7',
          'photo-1542406775-ade58c52d2e4',
          'photo-1620799139507-2a76f79a2f4d',
          'photo-1620799139652-715e4d5b29bf',
        ],
        colors: [COLORS.negro, COLORS.gris, COLORS.crema],
        stock: 30,
        featured: true,
      },
      {
        slug: 'crewneck-puente-centenario',
        name: 'Crewneck Puente Centenario',
        description:
          'Sudadera cuello redondo, algodón pesado, bordado del Puente Centenario en manga. Caída boxy moderna.',
        priceCents: 4900,
        imagesSeeds: ['507-puente-1', '507-puente-2', '507-puente-3'],
        unsplashIds: ['photo-1620799140188-3b2a02fd9a77', 'photo-1556909114-44e3e9399a2e', 'photo-1620799139834-6b8f844fbe61'],
        colors: [COLORS.azul, COLORS.gris, COLORS.negro],
        stock: 18,
        isNew: true,
      },
      {
        slug: 'zip-up-portobelo',
        name: 'Zip-Up Portobelo',
        description:
          'Sudadera con cierre completo, capucha forrada, cordones planos. Inspirada en los colores del Caribe panameño.',
        priceCents: 6400,
        imagesSeeds: ['507-portobelo-1', '507-portobelo-2', '507-portobelo-3'],
        unsplashIds: ['photo-1614094082869-cd4e4b2905c7', 'photo-1614093302611-8efc4de12407', 'photo-1611312449412-6cefac5dc3e4'],
        colors: [COLORS.negro, COLORS.militar, COLORS.beige],
        stock: 12,
      },
      {
        slug: 'hoodie-oversize-puma',
        name: 'Hoodie Oversize Puma',
        description:
          'Hoodie oversize con corte caído extremo. Tejido pesado anti-pilling. Estampado mínimo "507" en espalda.',
        priceCents: 5500,
        imagesSeeds: ['507-oversize-1', '507-oversize-2', '507-oversize-3'],
        unsplashIds: ['photo-1620799139834-6b8f844fbe61', 'photo-1614093302611-8efc4de12407', 'photo-1556821840-3a63f95609a7'],
        colors: [COLORS.crema, COLORS.gris, COLORS.negro],
        stock: 25,
      },
    ],
  },
  pantalones: {
    name: 'Pantalones',
    description: 'Joggers, cargos y wide leg. Comodidad para el día, presencia para la noche.',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_ROPA,
    products: [
      {
        slug: 'joggers-cinta-costera',
        name: 'Joggers Cinta Costera',
        description:
          'Joggers con cintura elástica ajustable, bolsillos laterales y trasero con cierre. Bajo con elástico discreto.',
        priceCents: 4200,
        imagesSeeds: ['507-joggers-1', '507-joggers-2', '507-joggers-3'],
        unsplashIds: ['photo-1542272604-787c3835535d', 'photo-1624378439575-d8705ad7ae80', 'photo-1583744946564-b52ac1c389c8'],
        colors: [COLORS.negro, COLORS.gris, COLORS.militar],
        stock: 32,
        featured: true,
      },
      {
        slug: 'pantalon-cargo-amador',
        name: 'Pantalón Cargo Amador',
        description:
          'Cargo pants con seis bolsillos, tejido ripstop resistente. Calce relajado, tobillo recogido con cordón.',
        priceCents: 5400,
        imagesSeeds: ['507-cargo-1', '507-cargo-2', '507-cargo-3'],
        unsplashIds: ['photo-1473966968600-fa801b869a1a', 'photo-1517445312882-bc9910d016b7', 'photo-1593030103066-0093718efeb9'],
        colors: [COLORS.militar, COLORS.beige, COLORS.negro],
        stock: 20,
        isNew: true,
      },
      {
        slug: 'wide-leg-balboa',
        name: 'Wide Leg Balboa',
        description:
          'Pantalón de pierna ancha en algodón twill. Cintura alta, pliegues frontales, calce holgado tipo Y2K.',
        priceCents: 5900,
        imagesSeeds: ['507-wide-1', '507-wide-2', '507-wide-3'],
        unsplashIds: ['photo-1551854838-212c50b4c184', 'photo-1582552938357-32b906df40cb', 'photo-1542272604-787c3835535d'],
        colors: [COLORS.crema, COLORS.negro, COLORS.gris],
        stock: 15,
      },
      {
        slug: 'shorts-veraneras',
        name: 'Shorts Veraneras',
        description:
          'Shorts cortos para el calor panameño. Algodón ligero, bolsillos profundos, bajo deshilachado intencional.',
        priceCents: 3200,
        imagesSeeds: ['507-shorts-1', '507-shorts-2', '507-shorts-3'],
        unsplashIds: ['photo-1591195853828-11db59a44f6b', 'photo-1602810318383-e386cc2a3ccf', 'photo-1551854838-212c50b4c184'],
        colors: [COLORS.beige, COLORS.negro, COLORS.militar],
        stock: 40,
      },
    ],
  },
  chaquetas: {
    name: 'Chaquetas',
    description: 'Bombers, anoraks y windbreakers. Para las noches en la Cinta y los aguaceros del trópico.',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_ROPA,
    products: [
      {
        slug: 'bomber-calidonia',
        name: 'Chaqueta Bomber Calidonia',
        description:
          'Bomber clásico con forro acolchado, puños y cintura elástica. Cierre frontal robusto, dos bolsillos laterales.',
        priceCents: 8900,
        compareAtCents: 10500,
        imagesSeeds: ['507-bomber-1', '507-bomber-2', '507-bomber-3', '507-bomber-4'],
        unsplashIds: [
          'photo-1591047139829-d91aecb6caea',
          'photo-1551028719-00167b16eac5',
          'photo-1544022613-e87ca75a784a',
          'photo-1583744946564-b52ac1c389c8',
        ],
        colors: [COLORS.negro, COLORS.militar, COLORS.azul],
        stock: 14,
        featured: true,
      },
      {
        slug: 'windbreaker-soberania',
        name: 'Windbreaker Soberanía',
        description:
          'Cortavientos ligero, repelente al agua, ideal para los chubascos. Capucha plegable y bolsillo canguro.',
        priceCents: 7200,
        imagesSeeds: ['507-wind-1', '507-wind-2', '507-wind-3'],
        unsplashIds: ['photo-1559551409-dadc959f76b8', 'photo-1547949003-9792a18a2601', 'photo-1591047139829-d91aecb6caea'],
        colors: [COLORS.rojo, COLORS.negro, COLORS.azul],
        stock: 10,
        isNew: true,
      },
      {
        slug: 'denim-jacket-chorrillo',
        name: 'Denim Jacket Chorrillo',
        description:
          'Chaqueta de mezclilla con lavado vintage. Corte trucker, botones metálicos, pespunte contrastado.',
        priceCents: 7800,
        imagesSeeds: ['507-denim-1', '507-denim-2', '507-denim-3'],
        unsplashIds: ['photo-1544022613-e87ca75a784a', 'photo-1551028719-00167b16eac5', 'photo-1571945153237-4929e783af4a'],
        colors: [COLORS.azul, COLORS.negro],
        stock: 16,
      },
      {
        slug: 'anorak-isla-taboga',
        name: 'Anorak Isla Taboga',
        description:
          'Anorak medio cierre con bolsillo canguro frontal. Ideal para el ferry y las caminatas costeras.',
        priceCents: 8500,
        imagesSeeds: ['507-anorak-1', '507-anorak-2', '507-anorak-3'],
        unsplashIds: ['photo-1547949003-9792a18a2601', 'photo-1601333144130-8cbb312386b6', 'photo-1542406775-ade58c52d2e4'],
        colors: [COLORS.beige, COLORS.militar, COLORS.negro],
        stock: 11,
      },
    ],
  },
  accesorios: {
    name: 'Gorras & Accesorios',
    description: 'Caps, beanies, bolsos y los detalles que cierran el outfit.',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_ACCESORIOS,
    products: [
      {
        slug: 'cap-snapback-pty',
        name: 'Cap Snapback PTY',
        description:
          'Snapback de seis paneles con bordado "PTY" en frente. Visera plana, cierre ajustable de presión.',
        priceCents: 2800,
        imagesSeeds: ['507-cap-1', '507-cap-2', '507-cap-3'],
        unsplashIds: ['photo-1588850561407-ed78c282e89b', 'photo-1521369909029-2afed882baee', 'photo-1521572267360-ee0c2909d518'],
        colors: [COLORS.negro, COLORS.blanco, COLORS.rojo],
        stock: 45,
        featured: true,
      },
      {
        slug: 'beanie-cerro-ancon',
        name: 'Beanie Cerro Ancón',
        description:
          'Gorro tejido de punto medio, dobladillo amplio. Etiqueta tejida lateral con el logo 507.',
        priceCents: 2200,
        imagesSeeds: ['507-beanie-1', '507-beanie-2', '507-beanie-3'],
        unsplashIds: ['photo-1576871337622-98d48d1cf531', 'photo-1510598155802-aef3eb6e9f33', 'photo-1521369909029-2afed882baee'],
        colors: [COLORS.negro, COLORS.militar, COLORS.crema],
        stock: 30,
      },
      {
        slug: 'tote-bag-mercado',
        name: 'Tote Bag Mercado',
        description:
          'Bolso de lona pesada con asas reforzadas y serigrafía interior. Para el supermercado, la playa o la oficina.',
        priceCents: 2500,
        imagesSeeds: ['507-tote-1', '507-tote-2', '507-tote-3'],
        unsplashIds: ['photo-1597481499750-3e6b22637e12', 'photo-1591561954557-26941169b49e', 'photo-1601925260368-ae2f83cf8b7f'],
        colors: [COLORS.crema, COLORS.negro],
        stock: 24,
      },
      {
        slug: 'rinonera-corredor',
        name: 'Riñonera Corredor',
        description:
          'Riñonera cruzada con cierre YKK, compartimento principal y bolsillo seguro. Correa ajustable a cintura o pecho.',
        priceCents: 3200,
        imagesSeeds: ['507-rino-1', '507-rino-2', '507-rino-3'],
        unsplashIds: ['photo-1591561954557-26941169b49e', 'photo-1597481499750-3e6b22637e12', 'photo-1553062407-98eeb64c6a62'],
        colors: [COLORS.negro, COLORS.militar],
        stock: 18,
      },
    ],
  },
  sneakers: {
    name: 'Sneakers',
    description: 'Tenis low y high top. De la cuadra al concierto, sin perder el paso.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80&auto=format&fit=crop',
    sizes: SIZES_SNEAKERS,
    products: [
      {
        slug: 'sneakers-albrook-low',
        name: 'Sneakers Albrook Low',
        description:
          'Tenis low top, suela de goma vulcanizada, parte superior de canvas resistente. Diseño minimalista atemporal.',
        priceCents: 7800,
        imagesSeeds: ['507-albrook-1', '507-albrook-2', '507-albrook-3', '507-albrook-4'],
        unsplashIds: [
          'photo-1542291026-7eec264c27ff',
          'photo-1600185365483-26d7a4cc7519',
          'photo-1525966222134-fcfa99b8ae77',
          'photo-1539185441755-769473a23570',
        ],
        colors: [COLORS.blanco, COLORS.negro, COLORS.beige],
        stock: 22,
        featured: true,
      },
      {
        slug: 'sneakers-diablo-rojo',
        name: 'Sneakers Diablo Rojo',
        description:
          'High top con detalles rojos inspirados en el icónico bus panameño. Suela acolchada extra para el día completo.',
        priceCents: 9500,
        imagesSeeds: ['507-diablo-1', '507-diablo-2', '507-diablo-3'],
        unsplashIds: ['photo-1595950653106-6c9ebd614d3a', 'photo-1606107557195-0e29a4b5b4aa', 'photo-1551107696-a4b0c5a0d9a2'],
        colors: [COLORS.negro, COLORS.rojo, COLORS.blanco],
        stock: 12,
      },
      {
        slug: 'runners-cinta-costera',
        name: 'Runners Cinta Costera',
        description:
          'Tenis tipo runner con espuma reactiva y malla técnica transpirable. Pensados para caminar todo el día.',
        priceCents: 11000,
        imagesSeeds: ['507-runner-1', '507-runner-2', '507-runner-3'],
        unsplashIds: ['photo-1542291026-7eec264c27ff', 'photo-1606107557195-0e29a4b5b4aa', 'photo-1606107557195-0e29a4b5b4aa'],
        colors: [COLORS.gris, COLORS.negro, COLORS.azul],
        stock: 15,
      },
      {
        slug: 'sneakers-canvas-coiba',
        name: 'Sneakers Canvas Coiba',
        description:
          'Tenis de lona, ojetes metálicos, suela de caucho natural. Hechos para el ritmo del trópico.',
        priceCents: 6500,
        compareAtCents: 7800,
        imagesSeeds: ['507-coiba-1', '507-coiba-2', '507-coiba-3'],
        unsplashIds: ['photo-1525966222134-fcfa99b8ae77', 'photo-1539185441755-769473a23570', 'photo-1600185365483-26d7a4cc7519'],
        colors: [COLORS.crema, COLORS.militar, COLORS.negro],
        stock: 26,
      },
    ],
  },
};

async function main() {
  console.log('Limpiando base de datos…');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log('Creando categorías y productos…');
  for (const [slug, cat] of Object.entries(CATEGORIES) as [CatKey, typeof CATEGORIES[CatKey]][]) {
    const created = await prisma.category.create({
      data: {
        slug,
        name: cat.name,
        description: cat.description,
        imageUrl: cat.imageUrl,
      },
    });

    for (const p of cat.products) {
      await prisma.product.create({
        data: {
          slug: p.slug,
          name: p.name,
          description: p.description,
          priceCents: p.priceCents,
          compareAtCents: p.compareAtCents ?? null,
          categoryId: created.id,
          images: JSON.stringify(imgs(p)),
          sizes: JSON.stringify(cat.sizes),
          colors: JSON.stringify(p.colors),
          stock: p.stock,
          featured: p.featured ?? false,
          isNew: p.isNew ?? false,
          active: true,
        },
      });
    }
    console.log(`  · ${cat.name} (${cat.products.length} productos)`);
  }

  const featuredCount = await prisma.product.count({ where: { featured: true } });
  const newCount = await prisma.product.count({ where: { isNew: true } });
  console.log(`Destacados: ${featuredCount} · Nuevos: ${newCount}`);

  console.log('Creando admin demo…');
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      email: 'admin@507street.com',
      passwordHash,
      name: 'Admin 507',
    },
  });

  console.log('Seed completo.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
