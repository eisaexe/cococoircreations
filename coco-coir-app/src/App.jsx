// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Phone, Globe, MapPin, MessageCircle, Image as ImageIcon, ArrowLeft, X, Info, ChevronRight, Edit2, PhoneCall } from 'lucide-react';
import NatureBackground from './NatureBackground';
import { products } from './products';
import './App.css';

const LOGO_URL = "./logo.jpeg";

// Product images - defined here in App.jsx
const productImages = {
  1: "./vermi.png",
  2: "./cocopeat.jpg",
  3: "./pot.png",
  4: "./fiber.png",
  5: "./rope.webp",
  6: "./8.png"
};

// Merge products with images
const productsWithImages = products.map(product => ({
  ...product,
  image: productImages[product.id]
}));

const galleryImages = [
  { id: 1, src: "./1.png", title: "", size: "tall", offset: "offset-1" },
  { id: 2, src: "./2.png", title: "", size: "wide", offset: "offset-2" },
  { id: 3, src: "./3.png", title: "", size: "square", offset: "offset-0" },
  { id: 4, src: "./4.png", title: "", size: "tall", offset: "offset-3" },
  { id: 5, src: "./rope.webp", title: "", size: "wide", offset: "offset-1" },
  { id: 6, src: "./5.png", title: "", size: "square", offset: "offset-2" },
  { id: 7, src: "./6.png", title: "", size: "tall", offset: "offset-0" },
  { id: 8, src: "./7.png", title: "", size: "wide", offset: "offset-3" },
  { id: 9, src: "./8.png", title: "", size: "square", offset: "offset-1" },
  { id: 10, src: "./fiber.png", title: "", size: "square", offset: "offset-2" },
];

export default function App() {
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('review');
  const [currentView, setCurrentView] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickProduct, setQuickProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', company: ''
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartDetails = Object.entries(cart).map(([key, qty]) => {
    const [prodId, size] = key.split('_');
    const product = productsWithImages.find(p => p.id.toString() === prodId);
    return { ...product, size, qty };
  });

  const productsRef = useRef(null);

  const scrollToProducts = () => {
    setCurrentView('home');
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQty = (productId, size, change) => {
    const key = `${productId}_${size}`;
    setCart((prev) => {
      const currentQty = prev[key] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const newCart = { ...prev };
        delete newCart[key];
        return newCart;
      }
      return { ...prev, [key]: newQty };
    });
    if (change > 0) {
      const text = `${change} item${change > 1 ? 's' : ''} added`;
      setToastMessage(text);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    let message = `Name: ${formData.name}\nPhone: ${formData.phone}`;
    if (formData.email) message += `\nEmail: ${formData.email}`;
    if (formData.company) message += `\nCompany: ${formData.company}`;
    if (cartDetails.length > 0) {
      message += "\n\nOrder items:";
      cartDetails.forEach(item => {
        message += `\n- ${item.name} (${item.size}kg) x ${item.qty}`;
      });
    }
    const encoded = encodeURIComponent(message);
    const waNumber = "919876543210";
    const url = `https://wa.me/${waNumber}?text=${encoded}`;
    window.open(url, '_blank');
    setShowCheckout(false);
    setCart({});
    setCheckoutStep('review');
  };

  return (
    <>
      <NatureBackground />

      <div className="app-container">

        {/* --- HEADER --- */}
        <header className="glass-header">
          <div className="brand" onClick={() => setCurrentView('home')}>
            <img src={LOGO_URL} alt="Coco Coir Creations" className="logo" />
            <div className="title-wrapper">
              <h1 className="header-title">COCO COIR <br /> CREATIONS</h1>
            </div>
          </div>

          <button className="cart-icon" onClick={() => setShowCheckout(true)}>
            <ShoppingBag size={20} />
            {Object.keys(cart).length > 0 && <span className="dot"></span>}
          </button>
        </header>

        {/* --- VIEW SWITCHER --- */}
        {currentView === 'home' ? (
          <>
            {/* --- HERO SECTION --- */}
            <section className="hero">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
              >
                <h1>Reviving Nature,<br /><span className="text-gradient">Reinventing Coconut.</span></h1>
                <p className="hero-quote">
                  "From the earth, for the earth. We turn humble husks into powerful growth solutions."
                </p>

                <div className="hero-buttons">
                  <button className="cta-btn primary" onClick={scrollToProducts}>
                    Explore Now
                  </button>
                  <button className="cta-btn secondary" onClick={() => setCurrentView('gallery')}>
                    <ImageIcon size={18} /> View Gallery
                  </button>
                </div>
              </motion.div>
            </section>

            {/* --- PRODUCTS LIST --- */}
            <section className="products-section" ref={productsRef}>
              <h3 className="section-title">Our Products</h3>
              <div className="product-stack">
                {productsWithImages.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="product-row glass-panel"
                    onClick={(e) => {
                      if (e.target.closest('.qty-btn') || e.target.closest('.more-details-btn')) return;
                      setQuickProduct(product);
                    }}
                  >
                    <div className="row-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="row-details">
                      <h2>{product.name}</h2>
                      <p className="desc">{product.description}</p>

                      <button className="more-details-btn" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
                        <Info size={16} /> More Details
                      </button>

                      <div className="size-selector">
                        {product.wholesaleOptions.map(size => {
                          const qty = cart[`${product.id}_${size}`] || 0;
                          return (
                            <div key={size} className="size-control">
                              <span className="size-label">{size}kg Bag</span>
                              <div className="stepper">
                                <button
                                  onClick={() => handleQty(product.id, size, -1)}
                                  disabled={qty === 0}
                                  className="qty-btn minus"
                                >
                                  -
                                </button>

                                <span className={`qty-display ${qty > 0 ? 'active' : ''}`}>{qty}</span>

                                <button
                                  onClick={() => handleQty(product.id, size, 1)}
                                  className="qty-btn plus"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="footer glass-panel">
              <h3>Coco Coir Creations</h3>
              <div className="contact-info">
                <p><MapPin size={16} /> 18/1, Hosahalli, Jala 2, Billamaranahalli, near Assetz Earth & Essense, Yelahanka Taluk, Banglore North, Bengaluru - 562157</p>
                <p><Phone size={16} /> +91 98765 43210</p>
                <p><Phone size={16} /> +91 90087 74218</p>
                <p><Globe size={16} /> www.cococoircreations.com</p>
              </div>
              <p className="copyright">© 2026 Coco Coir Creations</p>
            </footer>
          </>
        ) : (
/* --- GALLERY PAGE --- */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gallery-view">
            <div className="gallery-header">
              <button className="back-btn" onClick={() => setCurrentView('home')}>
                <ArrowLeft size={20} /> Home
              </button>
              <h2>Our Gallery</h2>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((img) => (
                <motion.div
                  key={img.id}
                  className={`gallery-item ${img.size}`}
                  layoutId={`img-${img.id}`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={img.src} alt={img.title} />
                  <div className="overlay"><span>{img.title}</span></div>
                </motion.div>
              ))}
            </div>
            <div className="gallery-cta">
              <button className="cta-btn primary" onClick={scrollToProducts}>
                Explore Our Products <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

{/* --- FLOATING CONTACT BUTTONS --- */}
        {/* Left side - Call and WhatsApp */}
        <div className="contact-fabs-left">
          <a href="tel:+919876543210" className="contact-fab call-fab" title="Call Us">
            <PhoneCall size={24} />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="contact-fab whatsapp-fab" title="WhatsApp">
            <MessageCircle size={24} />
          </a>
        </div>

        {/* Right side - Chatbot */}
        <div className="chatbot-fab" onClick={() => alert("AI Chatbot coming soon!")}>
          <MessageCircle size={24} />
        </div>

        {/* --- CHECKOUT MODAL --- */}
        <AnimatePresence>
          {showCheckout && (
            <motion.div className="checkout-overlay">
              <motion.div className="checkout-modal">
                <div style={{ padding: '20px' }}>
                  {checkoutStep === 'review' ? (
                    <>
                      <button type="button" className="back-link" onClick={() => setShowCheckout(false)} style={{ marginBottom: 15, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}><ArrowLeft size={18} /> Back</button>
                      <h3>Your Cart</h3>
                      {cartDetails.length === 0 ? (
                        <p>Your cart is empty.</p>
                      ) : (
                        <ul className="cart-list">
                          {cartDetails.map((item, idx) => (
                            <li key={idx} className="cart-item">
                              <div className="item-info">
                                <span>{item.name} – {item.size}kg × {item.qty}</span>
                              </div>
                              <div className="item-actions">
                                <button type="button" className="cart-btn edit" title="Edit" onClick={() => setQuickProduct(item)}>
                                  ✏️
                                </button>
                                <button type="button" className="cart-btn remove" title="Remove" onClick={() => {
                                  const key = `${item.id}_${item.size}`;
                                  setCart(prev => {
                                    const newCart = { ...prev };
                                    delete newCart[key];
                                    return newCart;
                                  });
                                }}>
                                  ✕
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {cartDetails.length > 0 && (
                        <button className="submit-btn" onClick={() => setCheckoutStep('details')}>Confirm Order</button>
                      )}
                    </>
                  ) : (
                    <form onSubmit={handleWhatsAppRedirect}>
                      <button type="button" className="back-link" onClick={() => setCheckoutStep('review')} style={{ marginBottom: 15, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}><ArrowLeft size={18} /> Back to Cart</button>
                      <h3>Customer Information</h3>
                      <div className="input-group">
                        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="input-group">
                        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                      <div className="input-group">
                        <input name="email" placeholder="Email (optional)" value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="input-group">
                        <input name="company" placeholder="Company (optional)" value={formData.company} onChange={handleInputChange} />
                      </div>
                      <button className="submit-btn" type="submit">Get Quotation via WhatsApp</button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

{/* --- PRODUCT DETAILS MODAL --- */}
        <AnimatePresence>
          {selectedProduct && selectedProduct.fullDetails && (
            <motion.div
              className="product-details-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedProduct(null);
                }
              }}
            >
              <motion.div
                className="details-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="details-header">
                  <button className="back-btn-details" onClick={() => setSelectedProduct(null)}>
                    <ArrowLeft size={20} /> Back
                  </button>
                  <button className="details-close-btn" onClick={() => setSelectedProduct(null)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="details-content-inner">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="detail-hero-img" />

                  <div className="detail-body">
                    <h1 className="detail-title">{selectedProduct.fullDetails.headline}</h1>
                    {selectedProduct.fullDetails.subHeadline && (
                      <p className="detail-subtitle">{selectedProduct.fullDetails.subHeadline}</p>
                    )}

                    {selectedProduct.fullDetails.sections.map((section, index) => (
                      <div key={index} className="detail-section">
                        <h3 className="section-header">{section.title}</h3>
                        <ul className="detail-list">
                          {section.items.map((item, i) => (
                            <li key={i}>
                              <ChevronRight size={16} className="bullet-icon" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="detail-qty-section">
                      {selectedProduct.wholesaleOptions.map(size => {
                        const key = `${selectedProduct.id}_${size}`;
                        const qty = cart[key] || 0;
                        return (
                          <div key={size} className="size-control">
                            <span className="size-label">{size}kg Bag</span>
                            <div className="stepper">
                              <button
                                onClick={() => handleQty(selectedProduct.id, size, -1)}
                                disabled={qty === 0}
                                className="qty-btn minus"
                              >
                                -
                              </button>
                              <span className={`qty-display ${qty > 0 ? 'active' : ''}`}>{qty}</span>
                              <button
                                onClick={() => handleQty(selectedProduct.id, size, 1)}
                                className="qty-btn plus"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="detail-footer">
                      <p><strong>Manufacturer:</strong> {selectedProduct.fullDetails.footer.manufacturer}</p>
                      <p><strong>Address:</strong> {selectedProduct.fullDetails.footer.address}</p>
                      {selectedProduct.fullDetails.footer.disclaimer && (
                        <p className="disclaimer"><em>* {selectedProduct.fullDetails.footer.disclaimer}</em></p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 20, borderTop: '1px solid #ddd' }}>
                      <button className="cta-btn secondary" onClick={() => setSelectedProduct(null)}>Back</button>
                      <button className="cta-btn primary" onClick={() => setSelectedProduct(null)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
{/* Quick product popup */}
          {quickProduct && (
            <motion.div className="quick-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setQuickProduct(null);
                }
              }}
            >
              <div className="quick-card-full glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="back-btn-quick" onClick={() => setQuickProduct(null)}><ArrowLeft size={18} /> Back</button>
                <div className="quick-hero-image">
                  <img src={quickProduct.image} alt={quickProduct.name} />
                </div>
                <div className="quick-body">
                  <h3>{quickProduct.name}</h3>
                  <p className="desc">{quickProduct.description}</p>

                  <div className="detail-qty-section small">
                    {quickProduct.wholesaleOptions.map(size => {
                      const key = `${quickProduct.id}_${size}`;
                      const qty = cart[key] || 0;
                      return (
                        <div key={size} className="size-control">
                          <span className="size-label">{size}kg</span>
                          <div className="stepper">
                            <button onClick={() => handleQty(quickProduct.id, size, -1)} disabled={qty === 0} className="qty-btn minus">-</button>
                            <span className={`qty-display ${qty > 0 ? 'active' : ''}`}>{qty}</span>
                            <button onClick={() => handleQty(quickProduct.id, size, 1)} className="qty-btn plus">+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <button className="cta-btn secondary" onClick={() => { setSelectedProduct(quickProduct); setQuickProduct(null); }}>More Description</button>
                    <button className="cta-btn primary" onClick={() => setQuickProduct(null)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- LIGHTBOX MODAL --- */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div className="lightbox" onClick={() => setSelectedImage(null)}>
              <button className="close-lightbox"><X size={30} /></button>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <h3>{selectedImage.title}</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Checkout Button */}
        {Object.keys(cart).length > 0 && !showCheckout && (
          <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="fab" onClick={() => setShowCheckout(true)}>
            Review Order ({totalItems})
          </motion.button>
        )}

        {/* Toast notification */}
        {toastVisible && (
          <div className="cart-toast">
            <span>{toastMessage}</span>
            <button className="go-cart-btn" onClick={() => setShowCheckout(true)}>Go to Cart</button>
          </div>
        )}

      </div>
    </>
  );
}
