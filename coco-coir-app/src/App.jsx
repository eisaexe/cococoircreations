// src/App.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Phone, Globe, MapPin, MessageCircle, Image as ImageIcon, ArrowLeft, X, Info, ChevronRight } from 'lucide-react';
import NatureBackground from './NatureBackground';
import { products } from './products';
import './App.css';

const LOGO_URL = "./logo.jpeg"; 

const galleryImages = [
  { id: 1, src: "https://placehold.co/400x600/16a34a/fff?text=Coco+Peat+Block", title: "Compressed Peat Blocks", size: "tall" },
  { id: 2, src: "https://placehold.co/600x400/5D3A29/fff?text=Fiber+Extraction", title: "Fiber Extraction Process", size: "wide" },
  { id: 3, src: "https://placehold.co/400x400/8CC63F/fff?text=Nursery", title: "Used in Nurseries", size: "square" },
  { id: 4, src: "https://placehold.co/400x500/15803d/fff?text=Rope+Making", title: "Handmade Coir Rope", size: "tall" },
  { id: 5, src: "https://placehold.co/500x400/d9f99d/000?text=Finished+Product", title: "Ready for Export", size: "wide" },
  { id: 6, src: "https://placehold.co/400x400/064e3b/fff?text=Texture", title: "Premium Texture", size: "square" },
];

export default function App() {
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', company: ''
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
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    // WhatsApp Logic
    alert("Redirecting to WhatsApp..."); 
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
              <h1 className="header-title">COCO COIR <br/> CREATIONS</h1>
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
                        Explore Products
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
                {products.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="product-row glass-panel"
                  >
                    <div className="row-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="row-details">
                      <h2>{product.name}</h2>
                      <p className="desc">{product.description}</p>
                      
                      {/* More Details Button */}
                      <button className="more-details-btn" onClick={() => setSelectedProduct(product)}>
                         <Info size={16} /> More Details
                      </button>

                      {/* QUANTITY SELECTOR WITH + AND - SYMBOLS */}
                      <div className="size-selector">
                        {product.wholesaleOptions.map(size => {
                          const qty = cart[`${product.id}_${size}`] || 0;
                          return (
                            <div key={size} className="size-control">
                              <span className="size-label">{size}kg Bag</span>
                              <div className="stepper">
                                {/* MINUS BUTTON */}
                                <button 
                                    onClick={() => handleQty(product.id, size, -1)} 
                                    disabled={qty === 0}
                                    className="qty-btn minus"
                                >
                                    -
                                </button>
                                
                                <span className={`qty-display ${qty > 0 ? 'active' : ''}`}>{qty}</span>
                                
                                {/* PLUS BUTTON */}
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
                    <ArrowLeft size={20} /> Back
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
          </motion.div>
        )}

        {/* --- CHATBOT BUTTON --- */}
        <div className="chatbot-fab" onClick={() => alert("AI Chatbot coming soon!")}>
            <MessageCircle size={24} />
        </div>

        {/* --- CHECKOUT MODAL --- */}
        <AnimatePresence>
          {showCheckout && (
            <motion.div className="checkout-overlay">
                <motion.div className="checkout-modal">
                    <button onClick={() => setShowCheckout(false)} className="close-btn"><X size={24}/></button>
                    <div style={{padding: '20px'}}>
                         <h3>Checkout</h3>
                         {/* Paste your full checkout form logic here if needed */}
                         <p>Please review your order before sending via WhatsApp.</p>
                         <button className="submit-btn" onClick={handleWhatsAppRedirect}>Confirm Order</button>
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
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                    <div className="details-header">
                        <button className="back-btn-details" onClick={() => setSelectedProduct(null)}>
                            <ArrowLeft size={24} /> Back
                        </button>
                    </div>
                    
                    <div className="details-content">
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

                            <div className="detail-footer">
                                <p><strong>Manufacturer:</strong> {selectedProduct.fullDetails.footer.manufacturer}</p>
                                <p><strong>Address:</strong> {selectedProduct.fullDetails.footer.address}</p>
                                {selectedProduct.fullDetails.footer.disclaimer && (
                                    <p className="disclaimer"><em>* {selectedProduct.fullDetails.footer.disclaimer}</em></p>
                                )}
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
            Review Order ({Object.values(cart).reduce((a, b) => a + b, 0)})
          </motion.button>
        )}

      </div>
    </>
  );
}