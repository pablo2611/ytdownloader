# 507 Street · Streetwear Panamá

Tienda online de ropa urbana / streetwear unisex para Panamá. Construida con
Next.js 14 (App Router), TypeScript estricto, Tailwind CSS, Prisma + SQLite y
Zustand para el carrito.

Moneda: **USD**, mostrada como **B/. 25.00** (balboa panameño equivalente 1:1 con el dólar).

---

## Inicio rápido

Requisitos: Node 18+ y `pnpm`.

```bash
cd panama-streetwear
pnpm install
cp .env.example .env             # ya viene un .env por defecto, solo si quieres regenerarlo

# inicializa la base de datos local SQLite y siembra datos demo
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed

# entorno de desarrollo
pnpm dev                         # http://localhost:3000
```

Abrirá la home en `http://localhost:3000`.

### Otros scripts

| Comando             | Para qué sirve                                   |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Servidor de desarrollo                           |
| `pnpm build`        | Build de producción (corre `prisma generate`)    |
| `pnpm start`        | Sirve el build de producción                     |
| `pnpm lint`         | Linter (eslint-config-next)                      |
| `pnpm db:push`      | Aplica el schema a `prisma/dev.db`               |
| `pnpm db:seed`      | Crea categorías, 24 productos y el admin demo    |
| `pnpm db:reset`     | Borra la DB y vuelve a sembrarla (force-reset)   |
| `pnpm db:studio`    | UI de Prisma Studio                              |

---

## Estructura del proyecto

```
panama-streetwear/
├── prisma/
│   ├── schema.prisma     # modelos: Category, Product, Order, OrderItem, AdminUser
│   ├── seed.ts           # 6 categorías + 24 productos + admin demo
│   └── dev.db            # SQLite local (generada por prisma db push)
├── public/               # logo.svg, favicon.svg, og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # html lang="es", Navbar, Footer, CartDrawer
│   │   ├── page.tsx                    # Home (Hero, destacados, categorías, brand story, newsletter)
│   │   ├── globals.css
│   │   ├── productos/
│   │   │   ├── page.tsx                # Catálogo con filtros server-side
│   │   │   ├── SortSelect.tsx          # Selector de orden (client)
│   │   │   └── [slug]/page.tsx         # Detalle producto + relacionados
│   │   ├── categoria/[slug]/page.tsx   # Categoría con hero + grid filtrable
│   │   ├── carrito/page.tsx            # Carrito client-side (Zustand)
│   │   ├── checkout/page.tsx           # Placeholder — lo conecta Task 2
│   │   └── api/products/               # GET /api/products y /api/products/[slug]
│   ├── components/
│   │   ├── layout/  Navbar, Footer, MobileNav, CartDrawer, CartButton, AnnouncementBar
│   │   ├── product/ ProductCard, ProductGrid, ProductGallery,
│   │   │            SizeSelector, ColorSwatch, AddToCartButton, FilterSidebar
│   │   ├── home/    Hero, FeaturedGrid, CategoryTiles, BrandStory, Newsletter
│   │   ├── cart/    CartItem, CartSummary, EmptyCart
│   │   └── ui/      Button, Badge, Input, Select, Sheet, Tabs, Skeleton
│   ├── lib/
│   │   ├── db.ts          # Prisma client singleton
│   │   ├── products.ts    # Capa de acceso a datos (server-only)
│   │   ├── utils.ts       # cn, formatPrice, slugify, parseImages/Sizes/Colors
│   │   └── constants.ts   # provincias, tallas, colores, sort options, etc.
│   ├── store/cart.ts      # Zustand con persist (key: 507-cart-v1)
│   └── types/index.ts
├── .env.example
├── .env                   # DATABASE_URL local + placeholders Stripe/Yappy
├── next.config.mjs        # remotePatterns para Unsplash y picsum.photos
├── tailwind.config.ts     # paleta ink/accent + tailwindcss-animate
└── README.md
```

---

## Decisiones clave

- **SQLite + Prisma**. `Product.images`, `sizes` y `colors` se almacenan como
  strings JSON porque SQLite no soporta arrays nativos. En `src/lib/utils.ts`
  hay helpers `parseImages`, `parseSizes` y `parseColors`.
- **Carrito en Zustand con `persist`**. Se persiste en `localStorage` con la
  clave `507-cart-v1`. El hook `useHasHydrated()` evita desajustes SSR.
  El identificador de cada ítem es compuesto: `productId__size__color`.
- **Catálogo server-side**. `productos/page.tsx` y `categoria/[slug]/page.tsx`
  son server components que consultan Prisma directo. Los filtros por talla y
  color se hacen en memoria porque SQLite no soporta operadores sobre JSON.
- **Imágenes**. Unsplash IDs reales como fuente principal; si fallaran, las
  semillas dejan listo el fallback de `picsum.photos`. Ambos hosts están
  en `next.config.mjs`.
- **Idioma**: español de Panamá en todos los textos. Moneda mostrada como
  `B/. 25.00`.

---

## Qué quedó implementado (Task 1)

- [x] Scaffold completo Next.js 14 + TS estricto + Tailwind.
- [x] Schema Prisma con todos los modelos para las 3 tareas.
- [x] Seed con 6 categorías y 24 productos (6 destacados, 4 nuevos).
- [x] Admin demo: `admin@507street.com` / `admin123` (hash bcrypt).
- [x] Layout con Navbar sticky, banner de anuncio, Footer, CartDrawer global.
- [x] Home: Hero, destacados, tiles de categorías, brand story, newsletter UI.
- [x] Catálogo con filtros (categoría, talla, color, precio, búsqueda, sort)
      y paginación de 12.
- [x] Detalle de producto: galería, selector de talla/color, cantidad,
      add to cart, badges, tabs (descripción, envíos, guía de tallas),
      productos relacionados.
- [x] Página de categoría con hero y grid filtrable.
- [x] Carrito completo con totales, envío gratis sobre B/. 75, persistido.
- [x] Placeholder de checkout (lo reemplaza Task 2).
- [x] API REST: `GET /api/products` y `GET /api/products/[slug]`.
- [x] SEO: metadata estática y dinámica por producto/categoría, OG image,
      `generateStaticParams` para detalles.

## Lo que viene en Task 2 — Checkout + pagos

- Formulario completo de checkout (datos del cliente, dirección, provincia,
  notas).
- Integración con **Yappy** (Panamá) — flujo de QR / app de banco.
- Integración con **Stripe** para tarjeta de crédito/débito.
- Opción de **pago contra entrega**.
- Webhooks de confirmación de pago.
- Email transaccional con número de pedido `507-000123`.
- Persistencia de orden en la tabla `Order` + `OrderItem`.
- Validación de stock al confirmar.

Ya quedan listos en este scaffold: modelos `Order` / `OrderItem`,
constantes de provincias panameñas, métodos de pago y placeholders de
variables de entorno en `.env.example`.

## Lo que viene en Task 3 — Panel de administración

- Login del admin (NextAuth + tabla `AdminUser`).
- CRUD de productos y categorías.
- Listado y detalle de órdenes, cambios de estado
  (pending → confirmed → shipped → delivered).
- Reportes simples (ventas por día, productos top).
- Subida de imágenes a un bucket (opcional).

Ya queda creado: tabla `AdminUser`, hash bcrypt, placeholders de
`NEXTAUTH_SECRET` y `NEXTAUTH_URL` en `.env.example`.

---

## Credenciales del admin demo

> Estas se crean al correr `pnpm db:seed` y son **solo para desarrollo**.

| Campo       | Valor                  |
| ----------- | ---------------------- |
| Email       | `admin@507street.com`  |
| Password    | `admin123`             |
| Hash        | bcrypt (`saltRounds=10`) |

---

## Notas de despliegue (futuro)

- Cambiar `DATABASE_URL` a una base persistente (PostgreSQL recomendado en
  producción; el schema es 100% compatible con un cambio de `provider`).
- Generar nuevos secretos para `NEXTAUTH_SECRET` con
  `openssl rand -base64 32`.
- Llenar credenciales reales de Yappy y Stripe antes de Task 2.

---

Hecho con orgullo en el 507.
