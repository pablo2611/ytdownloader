export const SITE_NAME = '507 Street';
export const SITE_DESCRIPTION =
  'Streetwear unisex hecho para Panamá. Tees, hoodies, sneakers y accesorios urbanos.';
export const SITE_URL = 'https://507street.com';

export const ANNOUNCEMENT_BANNER =
  '🚚 Envío gratis en pedidos sobre B/. 75 · Yappy disponible · Entregas en toda Panamá';

/** Provincias de Panamá (para selector de envío en Task 2). */
export const PROVINCIAS_PANAMA = [
  'Bocas del Toro',
  'Coclé',
  'Colón',
  'Chiriquí',
  'Darién',
  'Herrera',
  'Los Santos',
  'Panamá',
  'Panamá Oeste',
  'Veraguas',
  'Comarca Emberá-Wounaan',
  'Comarca Guna Yala',
  'Comarca Ngäbe-Buglé',
] as const;

export type Provincia = (typeof PROVINCIAS_PANAMA)[number];

export const TALLAS_ROPA = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
export const TALLAS_SNEAKERS = ['38', '39', '40', '41', '42', '43', '44'] as const;
export const TALLAS_UNICA = ['Única'] as const;

export const TODAS_LAS_TALLAS = [
  ...TALLAS_ROPA,
  ...TALLAS_SNEAKERS,
  ...TALLAS_UNICA,
] as const;

export const COLORES_BASE = [
  { name: 'Negro', hex: '#0a0a0a' },
  { name: 'Blanco', hex: '#f4f4f4' },
  { name: 'Gris', hex: '#6b7280' },
  { name: 'Verde militar', hex: '#4b5320' },
  { name: 'Beige', hex: '#d2b48c' },
  { name: 'Rojo', hex: '#b91c1c' },
  { name: 'Azul marino', hex: '#1e3a8a' },
  { name: 'Mostaza', hex: '#b45309' },
  { name: 'Crema', hex: '#efe7d5' },
] as const;

export const SORT_OPTIONS = [
  { value: 'nuevos', label: 'Más nuevos' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const PRODUCTS_PER_PAGE = 12;

export const PAYMENT_METHODS = [
  { value: 'yappy', label: 'Yappy' },
  { value: 'card', label: 'Tarjeta de crédito/débito' },
  { value: 'cod', label: 'Pago contra entrega' },
] as const;

export const CART_STORAGE_KEY = '507-cart-v1';
