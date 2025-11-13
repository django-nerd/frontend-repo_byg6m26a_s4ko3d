import { useEffect, useMemo, useState } from 'react'
import { Search, ShoppingCart, Star, Menu } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({ cartCount, onSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <a href="/" className="text-xl font-bold tracking-tight">
              shubh
            </a>
          </div>

          <div className="hidden md:flex items-center w-full max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Sign in</a>
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-3 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function CategoryPills({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={classNames(
          'px-4 py-2 rounded-full border text-sm',
          active === '' ? 'bg-black text-white border-black' : 'hover:bg-gray-100'
        )}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={classNames(
            'px-4 py-2 rounded-full border text-sm capitalize',
            active === c ? 'bg-black text-white border-black' : 'hover:bg-gray-100'
          )}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {product.image ? (
          <img src={product.image} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
          <p className="text-base font-semibold">${product.price?.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-700">{product.rating ?? 4.5}</span>
          <span className="text-xs text-gray-500">• {product.category}</span>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="mt-4 w-full rounded-md bg-black text-white py-2 hover:bg-gray-900"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h4 className="font-semibold text-gray-900">shubh</h4>
          <p className="mt-2">Modern e-commerce template built with React & Tailwind.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Shop</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-gray-900">All products</a></li>
            <li><a href="#" className="hover:text-gray-900">New arrivals</a></li>
            <li><a href="#" className="hover:text-gray-900">Best sellers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Support</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-gray-900">Help center</a></li>
            <li><a href="#" className="hover:text-gray-900">Returns</a></li>
            <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Company</h4>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-gray-900">About</a></li>
            <li><a href="#" className="hover:text-gray-900">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} shubh. All rights reserved.</div>
    </footer>
  )
}

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [cart, setCart] = useState([])
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(true)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) {
      const s = search.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(s) || (p.description||'').toLowerCase().includes(s))
    }
    if (category) list = list.filter(p => p.category === category)
    if (sort === 'price_asc') list.sort((a,b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a,b) => b.price - a.price)
    if (sort === 'rating_desc') list.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0))
    return list
  }, [products, search, category, sort])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setProducts([])
      } finally {
        setLoading(false)
      }
      try {
        const res = await fetch(`${BACKEND_URL}/api/categories`)
        const data = await res.json()
        setCategories(data)
      } catch (e) {
        setCategories([])
      }
    }
    fetchData()
  }, [])

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === p.id)
      if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Navbar cartCount={cart.reduce((a,c)=>a+c.qty,0)} onSearch={setSearch} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Explore products</h1>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-md py-2 px-3 text-sm"
            >
              <option value="">Sort</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Rating</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <CategoryPills categories={categories} active={category} onSelect={setCategory} />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border bg-white p-4">
                <div className="aspect-square rounded-lg bg-gray-200" />
                <div className="mt-4 h-4 bg-gray-200 rounded" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                <div className="mt-4 h-10 bg-gray-200 rounded" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No products found.
            </div>
          ) : (
            filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
