import React, { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';
import logoImg from './assets/la popular-LOGO.png';
import carousel1 from './assets/carousel-1.jpg';
import carousel2 from './assets/carousel-2.jpg';
import carousel3 from './assets/carousel-3.jpg';
import carousel4 from './assets/carousel-4.jpg';
import carousel5 from './assets/carousel-5.jpg';
import carousel6 from './assets/carousel-6.jpg';

// Custom SVG icons for social media (not available in lucide-react)
const FacebookIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const MenuDigital = () => {
  const [activeCategory, setActiveCategory] = useState('Entradas');
  const categoryRefs = useRef({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [resName, setResName] = useState('');
  const [resBranch, setResBranch] = useState('Centro');
  const [resDay, setResDay] = useState('');
  const [resTime, setResTime] = useState('');

  // Carrusel de 6 imágenes a pantalla completa
  const carouselImages = [
    carousel1, carousel2, carousel3, carousel4, carousel5, carousel6
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efecto para rotar el carrusel automáticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Get local today string YYYY-MM-DD
  const todayStr = React.useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // Format date to friendly Spanish string
  const formatResDay = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return dateObj.toLocaleDateString('es-ES', options);
  };

  // Generate available times depending on selected day of the week
  const availableTimes = React.useMemo(() => {
    if (!resDay) return [];
    
    const list = [];
    for (let h = 2; h <= 7; h++) {
      list.push(`${h}:00 PM`, `${h}:30 PM`);
    }
    list.push("8:00 PM");

    return list;
  }, [resDay]);

  // Keep resTime in sync when date changes
  useEffect(() => {
    if (availableTimes.length > 0) {
      if (!availableTimes.includes(resTime)) {
        setResTime(availableTimes[0]);
      }
    } else {
      setResTime('');
    }
  }, [availableTimes, resTime]);

  const handleSendReservation = (e) => {
    e.preventDefault();
    const formattedDay = formatResDay(resDay);
    const text = `Hola, me gustaría hacer una reservación:\n` +
      `Nombre: ${resName}\n` +
      `Sucursal: ${resBranch}\n` +
      `Día: ${formattedDay}\n` +
      `Horario: ${resTime}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/526145304495?text=${encodedText}`, '_blank');
    setReservationOpen(false);
    setResName('');
    setResDay('');
    setResTime('');
  };

  const categories = [
    "Entradas", "Para Sacar El Chamuco", "Caldo Pa La Cruz", "Tacos, Quecas y Quesi",
    "Los Chilaquiles", "Los Comelones", "Los De Dulce", "Cheve Siempre Helada", "Cheves",
    "Los Chescos", "Aguas Frescas", "Extras Extras", "Jugos Curativos", "Pal Despance", "Shots", "Los Pistos"
  ];

  const menuData = {
    "Entradas": [
      { name: "Tosti Ceviche Popu", price: "$195.99", desc: "200gr de Delicioso Ceviche mixto o de camarón servidos con tostitos a elegir (verdes o morados)" },
      { name: "Gorditas De Lengua", price: "$59.99 c/u", desc: "Gordita de harina, servida con cebolla y cilantro… apenas para unos besos." },
      { name: "Mariscada Popular", price: "$373.99", desc: "Hacha, camarón, pulpo y atún curtidos con limón y sal, acompañado con pepino, cebolla morada y salsas de la casa" },
      { name: "Carne Seca Preparada", price: "$130.99", desc: "preparada con limon, salsas negras, salsa valentina, tajin y clamato." },
      { name: "Aceitunas Preparadas", price: "$109.99", desc: "preparada con limon, salsas negras, salsa valentina, tajin y clamato." },
      { name: "Tostitos Preparados", price: "$45.00", desc: "preparada con limon, salsas negras, salsa valentina y tajín." },
      { name: "Tamal de Birria", price: "$54.99", desc: "1 pz de tamal de birria en cobijado con costra de queso, acompañado del consomé di birria, cebolla y cilantro" }
    ],
    "Para Sacar El Chamuco": [
      { name: "Aguachile Nigga", price: "$245.99", desc: "Tiradito de camarones con salsa de la casa, pepino, cebolla morada, cilantro y aguacate" },
      { name: "Tostada Callo de Hacha", price: "$199.99", desc: "Callito en tostada, con aderezo chipotle, pepino, cebolla morada, aguacate, poro frito y cilanto" },
      { name: "Tostada Aguachile de Camarón", price: "$129.99", desc: "Camarones curtidos con salsa de aguachile, pepino y cebolla morada." },
      { name: "Aguachile Popular", price: "$234.99", desc: "Tradicional aguachile curtido con salsa de la casa, limon, sal, pepino, cebolla morada y cilantro" },
      { name: "Tostada de Atún", price: "$199.99", desc: "120 gr de atún, cebolla morada, cilantro y aguacate y pepino curtido en limón y salsa negra" },
      { name: "Tiradito de Atún", price: "$259.99", desc: "250 gr de Tiradito atún curtido con limón y sal, salsa negra, acompañado de cebolla morada, aguacate y cilantro" },
      { name: "Ceviche de Camarón", price: "$199.99", desc: "250 gr de ceviche de camarón con pepino, cebolla morada, tomate, aguacate y cilantro, acompañado de tostadas" },
      { name: "Ceviche De Atun", price: "$229.99", desc: "120 gr de atun en posta filetiado" },
      { name: "Ostiones En Su Concha", price: "$25.00", desc: "Media docena $130.00. Ostiones en su concha con salsa negra, cebolla y cilantro" },
      { name: "Ostiones Reina", price: "$119.99", desc: "3 pz de ostiones coronado con callito de hacha." },
      { name: "Cocktail De Camarón", price: "$147.99", desc: "Tradicional cocktail de camarón, pero bien hecho…" },
      { name: "Cocktail Campechana", price: "$185.99", desc: "Tradicional campechana de camarón crudo y cocido, acompañado con pulpo" },
      { name: "Aguachile Verde", price: "$209.99", desc: "200 gr de camarón, pepino, cilantro y cebolla morada en salsa verde" },
      { name: "Copa de Oro", price: "$125.99", desc: "Camarón, chiltepín, limón, sal, cilantro, cebolla y callito, con nuestra salsa de la casa" },
      { name: "Orden de callos", price: "$357.99", desc: "3 pz de callo riñon, fileteadas y sazonadas en limon, salsas de la casa y chiltepin, acompañado de pepino y cebola morada" }
    ],
    "Caldo Pa La Cruz": [
      { name: "Sopa De Camarón", price: "$164.99", desc: "200gr de Camarones ahogados en el delicioso consomé popular servido con verduras" },
      { name: "Sopa De Mariscos", price: "$185.99", desc: "220 gr de variedad de mariscos, ahogados en el delicioso consomé popular, acompañado de verduras." },
      { name: "Menudo", price: "Chico $109.99 | Gde $139.99 | Esp $189.99 | Lt $275.99", desc: "Delicioso menudo tradicional con pancita y granos de maíz acompañado de pan de barrio verduras y limón." },
      { name: "Menudo De Lengua", price: "Chico $143.99 | Gde $189.99 | Lt $374.99", desc: "Delicioso Menudo de lengua y maíz acompañado de pan de barrio verduras y limones." },
      { name: "Menudo Mixto Pata Panza Y Lengua", price: "Chico $145.99 | Gde $179.99 | Lt $375.99", desc: "Deliciosa combinación de menudo con pancita, pata, lengua y maíz, acompañado de pan de barrio, verduras y limones." },
      { name: "Pozole", price: "Plato $139.99 | Litro $275.99", desc: "Delicioso pozole y maíz acompañado de pan de barrio, verduras y limones" },
      { name: "Birria De Res", price: "Chico $109.99 | Grande $155.99", desc: "Deliciosa birria de res acompañada de deliciosa tortilla hecha a mano, mantequilla menonita, limones y verdura." },
      { name: "Birriamen", price: "$155.99", desc: "Sopa Ramen con Birria acompañado de verduras y limones." }
    ],
    "Tacos, Quecas y Quesi": [
      { name: "Tacos de Lengua (3 pz)", price: "Ord $176.99 | $66.99 c/u", desc: "Acompañados de cebolla y cilantro, tortilla de su preferencia." },
      { name: "Tacos de Birria (3 pz)", price: "Ord $141.99 | $42.99 c/u", desc: "Acompañados de un mini consomé." },
      { name: "Quesibirria (3 pz)", price: "Ord $143.99 | $59.99 c/u", desc: "Sazonadas acompañadas de su consome, cebolla y cilantro." },
      { name: "Tacos de Lengua con Tuetano (3 pz)", price: "Ord $199.99 | $66.99 c/u", desc: "Acompañados de cebolla y cilantro" },
      { name: "Queca de Camarón (3 pz)", price: "Ord $143.99 | $49.99 c/u", desc: "Acompañadas de aderezo chipotle de la casa y repollo." },
      { name: "Tacos de Barbacha (3 pz)", price: "Ord $143.99 | $49.99 c/u", desc: "De nuestras exquisita barbacoa acompañados de cebolla y cilantro." },
      { name: "Quesi Barbacha (3 pz)", price: "Ord $165.99 | $55.99 c/u", desc: "Nuestra exquisita barbacoa de cachete costra de queso acompañados de cebolla y cilantro y limones." },
      { name: "Queca de Pulpo", price: "Ord $194.99 | $64.99 c/u", desc: "Pulpo, salsa zarandeada, frijol negro y queso." },
      { name: "Enchiladas Gobernador (3 pz)", price: "$149.99", desc: "Maíz o harina. 140g de camarón, queso Chihuahua, bañadas en chile colorado, crema, cebolla, cilantro y aguacate" }
    ],
    "Los Chilaquiles": [
      { name: "Rojos", price: "$185.99", desc: "Deliciosos chilaquiles con salsa roja, queso blanco, crema, cilantro, cebolla y aguacate." },
      { name: "Verdes", price: "$185.99", desc: "Deliciosos chilaquiles con salsa verde, queso blanco, crema, cilantro, cebolla, aguacate y salsa verde." },
      { name: "Blancos", price: "$185.99", desc: "Salsa de crema con habanero con toque de la casa la popular, servidos con queso blanco, cilantro, cebolla, crema y aguacate." }
    ],
    "Los Comelones": [
      { name: "Lonche De Chilaquiles Con Chicharrón Ramos", price: "$165.99", desc: "Pan blanco de panadería de barrio con chilaquiles regios dentro bañados en salsa A ELEGIR." },
      { name: "Lonche De Lengua", price: "$176.99", desc: "Pan blanco de panadería de barrio con lengua, repollo cilantro y cebolla." },
      { name: "Lonche De Menudo", price: "$143.99", desc: "Pan blanco de panadería de barrio con pancita servido con repollo, cilantro y cebolla." },
      { name: "Lonche Barbacoa", price: "$143.99", desc: "Pan de barrio, con deliciosa barbacoa de cachete, cilantro, cebolla y repollo" },
      { name: "Lonche De Birria", price: "$165.99", desc: "Pan blanco de barrio, 150 gr de birria servido con verdura acompañado de consomé." }
    ],
    "Los De Dulce": [
      { name: "Pan de nata popular", price: "$79.99", desc: "Acompañado de nieve de vainilla y azucar glass" },
      { name: "Carlota de Limón", price: "$79.99", desc: "Clasico pay de limon con galleta maría." },
      { name: "Flan Casero", price: "$109.99", desc: "Delicioso flan casero bañado en dulce de leche, con nuez." },
      { name: "Pan de Nata", price: "$79.99", desc: "Servido con nutella y nieve de vainilla." },
      { name: "Copa De Nieve", price: "$79.99", desc: "Nieve cremosita bañada en caramelo, acompañada de una crujiente galletita." }
    ],
    "Cheve Siempre Helada": [
      { name: "Chapagne de Barrio (1.2 lts)", price: "$99.99", desc: "Caguamón Nacional, Carta Blanca, Indio, Sol, Tecate roja, Tecate light, XX." },
      { name: "Chamuca", price: "$129.99", desc: "Caguama Miller High Life, sazonada con tajin, limón y clamato." }
    ],
    "Cheves": [
      { name: "Cerveza Nacional (355ml.)", price: "$27.99", desc: "Carta Blanca, Tecate Blanca, Tecate Roja, Tecate 0.0, Indio" },
      { name: "XX Lagger (355 ml.)", price: "$34.99", desc: "" },
      { name: "XX Ambar (355 ml.)", price: "$34.99", desc: "" },
      { name: "XX Ultra (355 ml.)", price: "$34.99", desc: "" },
      { name: "Amstel Ultra (355 ml.)", price: "$37.99", desc: "" },
      { name: "Heineken (355 ml.)", price: "$34.99", desc: "Regular, Silver, 0.0" },
      { name: "Miller High Life (355 ml.)", price: "$37.99", desc: "" },
      { name: "Miller Lite (355 ml.)", price: "$37.99", desc: "" },
      { name: "Caguama Miller (940 ml.)", price: "$113.99", desc: "" }
    ],
    "Los Chescos": [
      { name: "Elite (355 ml.)", price: "$25.99", desc: "Fresa, Uva, Naranja" },
      { name: "Manzanita Soto (355 ml.)", price: "$25.99", desc: "" },
      { name: "Jarritos (355 ml.)", price: "$25.99", desc: "Tuti Fruti, Piña, tamarindo, fresa, mandarina" },
      { name: "Squirt (355 ml.)", price: "$25.99", desc: "" },
      { name: "Boing (237 ml.)", price: "$25.99", desc: "Fresa, Guayaba, Uva, Mango" },
      { name: "Coca Cola (355 ml.)", price: "$34.99", desc: "Light, Regular, Sin Azúcar" },
      { name: "Root Beer IBC (355 ml.)", price: "$34.99", desc: "" },
      { name: "Agua mineral", price: "$25.99", desc: "" },
      { name: "Agua natural", price: "$20.00", desc: "" }
    ],
    "Aguas Frescas": [
      { name: "Agua de horchata (500 ml)", price: "$44.99", desc: "" },
      { name: "Agua de aguacate cremosita (500 ml)", price: "$44.99", desc: "" },
      { name: "Limonada mineral o natural (500 ml)", price: "$39.99", desc: "" },
      { name: "Limonada de pepino (500 ml)", price: "$44.99", desc: "" },
      { name: "Limonada de fresa (500 ml)", price: "$44.99", desc: "" }
    ],
    "Extras Extras": [
      { name: "Michelado", price: "$15.99", desc: "Limon, salsas negras, pimienta, salsa valentina, escarchado con tajin." },
      { name: "Michelado Con Carne Seca", price: "$24.99", desc: "Limón, salsas negras, pimienta, salsa valentina, escarchado con tajín con carne seca." },
      { name: "Michelado Con Camaron", price: "$24.99", desc: "Limón, salsas negras, salsa valentina, escarchado con tajín, con camarón." },
      { name: "Michelado Mar Y Tierra", price: "$34.99", desc: "Con limon, salsas negras, pimienta, valentina, camaron seco, carne seca y escarchado con tajin." },
      { name: "Michelado Gringa", price: "$29.99", desc: "Es el clásico michelado pero con clamato y sal de la casa picosota" },
      { name: "Clamato Preparado", price: "$59.99", desc: "Es el clásico michelado con salsa de camarón, clamato y sal de la casa." },
      { name: "Suero Mineral", price: "$64.99", desc: "Una botella de agua mineral escarchada con chamoy y tajin, clamato, sangrita, sal de la casa y limón." },
      { name: "Suero De Sabor", price: "$99.99", desc: "Vaso de litro escarchado con tajin, acompañado de refresco de jarritos." },
      { name: "Suero Con Suero", price: "$99.99", desc: "Vaso de litro escarchado en tajin y chamoy, limón, salsas negras, y suero con sabor a elegir." },
      { name: "Jarra Con Clamato Y Cerveza", price: "$159.99", desc: "Jarra con la magia de la popular, ideal para sacarte el chamuco… con cerveza." },
      { name: "Chelado", price: "$22.00", desc: "escarchado con sal y limon" },
      { name: "Clamato Ari", price: "$99.00", desc: "clamato preparado con los polvos magicos de la popular, especial para sacar el chamuco" },
      { name: "Clamato mar y tierra", price: "$80.00", desc: "clamato preparado con limon, salsas negras, picante, carne seca y camaron seco" },
      { name: "Michelado clamato", price: "$55.00", desc: "vaso michelado con una porcion de clamato, ideal para rellenar con cheve" }
    ],
    "Jugos Curativos": [
      { name: "Toloache", price: "$99.99", desc: "El amarre que tu novia te dio de tomar… pero con mezcal y un toque de aguita de coco." },
      { name: "Cielo Rojo", price: "$129.99", desc: "Vaso de litro escarchado con limón, salsas negras, vodka, sangrita, clamato, tequila y cerveza a elegir (Cuartitos de tecate light, Indio o XX.)." },
      { name: "Horchata Del Principe", price: "$99.99", desc: "Clásica horchata 100% natural con piquete de bacacho." },
      { name: "Agüita de Coco", price: "$99.99", desc: "Suero de coco con limon y sal, hierba buena, y piquete de vodka del fino y un toque de squirt." },
      { name: "Arrancadón de pelos", price: "$99.99", desc: "Limón, clamato, sangrita, vodka." },
      { name: "Mojito Aperol", price: "$99.99", desc: "Bacardi blanco, aperol, hierba buena y limón." },
      { name: "Mojito de Raíz", price: "$99.99", desc: "Jagger, Root beer, Hierba Buena y limón." },
      { name: "Bolishots", price: "$25.00", desc: "¡pregunta por nuestros sabores disponibles!" }
    ],
    "Pal Despance": [
      { name: "Carajillo Pupu", price: "$159.99", desc: "Café espresso con licor 43, paleta magnum." },
      { name: "Carajillo Baileys", price: "$169.00", desc: "" },
      { name: "Copa de Baileys", price: "$80.00", desc: "" },
      { name: "Mimosa la del barrio", price: "$79.99", desc: "Para arrancar el día, Champange con jugo de naranja." },
      { name: "Colada Playera", price: "$99.99", desc: "Clásica piña colada pero con amorrrr." },
      { name: "Mezcalitas", price: "$99.99", desc: "De Jamaica, fresa, mango y piña." },
      { name: "Margaritas", price: "$99.99", desc: "Margaritas clásicas de limón, Jamaica, Fresa, Mango y Piña." }
    ],
    "Shots": [
      { name: "Perla Negra", price: "$120.00", desc: "" },
      { name: "Bufanda", price: "$120.00", desc: "" }
    ],
    "Los Pistos": [
      { name: "Maestro Dobel (Tequila)", price: "Copa $120.00 | Bot $1,500", desc: "" },
      { name: "1800 cristalino (Tequila)", price: "Copa $120.00 | Bot $1,500", desc: "" },
      { name: "1800 reposado (Tequila)", price: "Copa $100.00 | Bot $1,300", desc: "" },
      { name: "7 leguas (Tequila)", price: "Copa $120.00 | Bot $1,500", desc: "" },
      { name: "Tradicional plata (Tequila)", price: "Copa $70.00 | Bot $850", desc: "" },
      { name: "Don Julio 70 (Tequila)", price: "Copa $135.00 | Bot $1,800", desc: "" },
      { name: "Bura (Sotol)", price: "Copa $65.00 | Bot $800", desc: "" },
      { name: "Caminos y huellas (Mezcal)", price: "Copa $60.00 | Bot $600", desc: "" },
      { name: "400 conejos (Mezcal)", price: "Copa $75.00 | Bot $850", desc: "" },
      { name: "Black and White (Whisky)", price: "Copa $55.00 | Bot $500", desc: "" },
      { name: "Black Label (Whisky)", price: "Copa $105.00 | Bot $1,200", desc: "" },
      { name: "Buchannans (Whisky)", price: "Copa $105.00 | Bot $1,200", desc: "" },
      { name: "Jack Daniels (Whisky)", price: "Copa $90.00 | Bot $950", desc: "" },
      { name: "Torres 10 (Brandy)", price: "Copa $75.00 | Bot $750", desc: "" },
      { name: "Bacardi Blanco (Ron)", price: "Copa $55.00 | Bot $500", desc: "" },
      { name: "Capitán Morgan (Ron)", price: "Copa $55.00 | Bot $500", desc: "" },
      { name: "Matusalem Platino (Ron)", price: "Copa $65.00 | Bot $650", desc: "" },
      { name: "Zacapa (Ron)", price: "Copa $150.00 | Bot $1,800", desc: "" },
      { name: "Remy Martin (Cognac)", price: "Copa $150.00 | Bot $1,700", desc: "" },
      { name: "Smirnoff (Vodka)", price: "Copa $55.00 | Bot $500", desc: "" }
    ]
  };

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    const element = categoryRefs.current[cat];
    if (element) {
      const yOffset = -70; // Offset ajustado para el nuevo sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const category of categories) {
        const element = categoryRefs.current[category];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.pageYOffset;
          const elementBottom = bottom + window.pageYOffset;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveCategory(category);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  return (
    <div className="font-sans min-h-screen text-white bg-[#007A5E]" style={{
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")',
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Pacifico&family=Poppins:wght@400;600;700&display=swap');
          
          .font-signeta { font-family: 'Signeta', 'Luckiest Guy', cursive !important; }
          .font-amentha { font-family: 'Amentha', 'Pacifico', cursive !important; }
          .font-sans { font-family: 'Poppins', sans-serif; }
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          .logo-shadow {
            -webkit-text-stroke: 1.5px #002e23;
            text-shadow: 4px 4px 0px #002e23, 6px 6px 0px rgba(0,0,0,0.4);
          }

          .rotulo-title {
            -webkit-text-stroke: 1.5px #004B3A;
            text-shadow: 4px 4px 0px #FFAC04, 7px 7px 0px #004B3A, 10px 10px 6px rgba(0,0,0,0.3);
          }

          .rotulo-style-0 { color: #FF007F; -webkit-text-stroke: 2px #ffffff; text-shadow: 4px 4px 0px #00E5FF, 7px 7px 0px #111111, 9px 9px 5px rgba(0,0,0,0.4); }
          .box-style-0 { border-bottom-color: #FF007F; }
          .rotulo-style-1 { color: #FF6600; -webkit-text-stroke: 2px #ffffff; text-shadow: 4px 4px 0px #6600CC, 7px 7px 0px #111111, 9px 9px 5px rgba(0,0,0,0.4); }
          .box-style-1 { border-bottom-color: #FF6600; }
          .rotulo-style-2 { color: #FFCC00; -webkit-text-stroke: 2px #ffffff; text-shadow: 4px 4px 0px #E60000, 7px 7px 0px #111111, 9px 9px 5px rgba(0,0,0,0.4); }
          .box-style-2 { border-bottom-color: #E60000; }
          .rotulo-style-3 { color: #00BFFF; -webkit-text-stroke: 2px #ffffff; text-shadow: 4px 4px 0px #FF5722, 7px 7px 0px #111111, 9px 9px 5px rgba(0,0,0,0.4); }
          .box-style-3 { border-bottom-color: #00BFFF; }
          .rotulo-style-4 { color: #007A5E; -webkit-text-stroke: 2px #ffffff; text-shadow: 4px 4px 0px #FFAC04, 7px 7px 0px #111111, 9px 9px 5px rgba(0,0,0,0.4); }
          .box-style-4 { border-bottom-color: #007A5E; }

          .rotulo-subtitle {
            -webkit-text-stroke: 1px #111111;
            text-shadow: 2px 2px 0px #111111, 3px 3px 3px rgba(0,0,0,0.3);
            letter-spacing: 0.05em;
          }

          .teo-input {
            font-family: 'Poppins', sans-serif;
            background-color: #ffffff;
            border: 2px solid #007A5E;
            color: #004B3A;
            padding: 0.625rem 0.75rem;
            border-radius: 8px;
            font-size: 0.875rem;
            width: 100%;
            transition: all 0.2s ease;
          }
          .teo-input:focus {
            outline: none;
            border-color: #FFAC04;
            box-shadow: 0 0 0 3px rgba(255, 172, 4, 0.3);
          }
          .teo-input::placeholder { color: #007A5E; opacity: 0.6; }
        `}
      </style>

      {/* HEADER LA POPULAR - Pulido con fondo sutil y botón elegante */}
      <div className="relative bg-gradient-to-b from-[#003B2D] to-[#004B3A] pt-10 pb-5 z-20 flex flex-col items-center justify-center border-b-2 border-[#1a3028] shadow-lg">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setReservationOpen(true)}
            className="bg-transparent border-[1.5px] border-[#FFAC04] text-[#FFAC04] hover:bg-[#FFAC04] hover:text-[#004B3A] px-4 py-1.5 md:px-5 md:py-2 font-sans font-semibold text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 rounded shadow-[0_0_8px_rgba(255,172,4,0.15)] hover:shadow-[0_0_12px_rgba(255,172,4,0.4)] hover:-translate-y-0.5"
          >
            Reservaciones
          </button>
        </div>

        <div className="text-center flex flex-col items-center justify-center px-4">
          <img src={logoImg} alt="La Popular" className="h-24 sm:h-28 md:h-36 w-auto object-contain drop-shadow-lg" />
        </div>
      </div>

      {/* MENÚ NAVEGABLE STICKY - Estilo Pestañas pulido */}
      <nav className="sticky top-0 z-50 bg-[#122b21] shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-b-2 border-[#007A5E]">
        <div className="max-w-6xl mx-auto overflow-x-auto no-scrollbar">
          <ul className="flex items-end px-2 pt-2">
            {categories.map((cat) => (
              <li key={cat} className="flex-shrink-0">
                <button
                  onClick={() => scrollToCategory(cat)}
                  className={`font-signeta text-sm md:text-lg px-5 py-2.5 transition-all duration-300 uppercase tracking-wide rounded-t-lg
                    ${activeCategory === cat
                      ? 'bg-[#007A5E] text-[#FFAC04] border-t-4 border-[#FFAC04] shadow-inner'
                      : 'bg-transparent text-white/70 hover:bg-[#004B3A]/50 hover:text-white border-t-4 border-transparent'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* CARRUSEL DE IMÁGENES FULL WIDTH - Con degradado inferior para visibilidad */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[21/9] overflow-hidden bg-[#002e23] z-40 border-b-[6px] border-[#004B3A]">
        {carouselImages.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Capa de oscurecimiento suave inferior para que resalten los puntos SIEMPRE */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <img 
              src={src} 
              className="w-full h-full object-cover" 
              alt="Especialidad La Popular" 

            />
          </div>
        ))}
        
        {/* Puntos de Paginación */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)} 
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${index === currentSlide ? 'bg-[#FFAC04] scale-125' : 'bg-white/50 hover:bg-white'}`} 
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MODAL DE RESERVACIONES */}
      {reservationOpen && (
        <div className="fixed inset-0 z-[100] bg-[#002e23]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#FFAC04] rounded-xl shadow-2xl max-w-md w-full p-6 text-[#004B3A] relative animate-fade-in">
            <button
              onClick={() => setReservationOpen(false)}
              className="absolute right-4 top-4 text-[#007A5E] hover:text-[#FFAC04] transition-colors cursor-pointer"
            >
              <X size={28} />
            </button>

            <h3 className="font-signeta text-4xl tracking-wider mb-6 text-center text-[#007A5E] border-b-4 border-[#FFAC04] pb-2 rotulo-title">
              Reservar Mesa
            </h3>

            <form onSubmit={handleSendReservation} className="space-y-4">
              <div>
                <label className="block font-sans font-bold text-sm uppercase mb-1">Nombre</label>
                <input type="text" required value={resName} onChange={(e) => setResName(e.target.value)} placeholder="Tu nombre completo" className="teo-input" />
              </div>
              <div>
                <label className="block font-sans font-bold text-sm uppercase mb-1">Sucursal</label>
                <select value={resBranch} onChange={(e) => setResBranch(e.target.value)} className="teo-input">
                  <option value="Centro">Sucursal Centro</option>
                  <option value="Cantera">Sucursal Cantera</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-sm uppercase mb-1">Día</label>
                  <input type="date" required value={resDay} onChange={(e) => setResDay(e.target.value)} min={todayStr} className="teo-input" />
                </div>
                <div>
                  <label className="block font-sans font-bold text-sm uppercase mb-1">Horario</label>
                  <select value={resTime} onChange={(e) => setResTime(e.target.value)} required disabled={!resDay} className="teo-input">
                    {!resDay ? <option value="">Elige día</option> : availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setReservationOpen(false)} className="w-1/2 border-2 border-[#007A5E] text-[#007A5E] py-2.5 font-sans font-bold text-sm uppercase hover:bg-[#007A5E] hover:text-white transition-colors rounded-md cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" className="w-1/2 bg-[#FFAC04] text-[#004B3A] py-2.5 font-sans font-bold text-sm uppercase hover:bg-[#e59b04] transition-colors rounded-md cursor-pointer border-b-4 border-[#c48403] active:border-b-0 active:translate-y-1">
                  Enviar WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTENIDO DEL MENÚ */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {categories.map((category, index) => {
          const styleIndex = index % 5;
          return (
          <div
            key={category}
            ref={(el) => categoryRefs.current[category] = el}
            className="mb-16 pt-2 scroll-mt-24"
          >
            {/* Título de la Categoría con Estilo Bloque y Líneas - Mejorado con sombra */}
            <div className="mb-10 flex items-center justify-center w-full relative">
              <div className="h-[2px] bg-[#004B3A] flex-grow opacity-50 hidden sm:block"></div>
              <div className={`bg-[#003B2D] px-6 md:px-12 py-3 mx-4 shadow-2xl border-y-[3px] box-style-${styleIndex}`}>
                <h2 className={`font-signeta text-3xl md:text-5xl tracking-widest uppercase text-center rotulo-style-${styleIndex}`}>
                  {category}
                </h2>
              </div>
              <div className="h-[2px] bg-[#004B3A] flex-grow opacity-50 hidden sm:block"></div>
            </div>

            {/* Subtítulos Especiales Dinámicos */}
            {category === "Para Sacar El Chamuco" && (
                <p className="text-center italic text-white/90 mb-10 font-sans max-w-2xl mx-auto text-sm md:text-base bg-[#004B3A]/80 p-3 rounded border border-[#FFAC04]/30 shadow-sm">
                  Todos nuestros platos están sujetos a disponibilidad de los mares mexicanos y nuestros pescadores.
                </p>
            )}
            {category === "Tacos, Quecas y Quesi" && (
                <div className="bg-[#FFAC04] text-[#004B3A] text-center font-bold font-sans py-2 px-4 rounded mb-10 max-w-lg mx-auto shadow-md text-xs md:text-sm tracking-wide">
                  HARINA O MAÍZ (+ $15 ORDEN DE HARINA | + $5 C/U HARINA)
                </div>
            )}
            {category === "Los Chilaquiles" && (
                <div className="bg-[#004B3A]/90 border-2 border-[#FFAC04] text-white text-center font-sans py-3 px-4 rounded mb-10 max-w-xl mx-auto shadow-md text-sm md:text-base">
                  Monta tus chilaquiles por <span className="text-[#FFAC04] font-bold text-lg">+$49.99</span> y elige ingrediente:<br/>
                  <span className="text-white/80 text-sm">Birria / Chicharrón Ramos / Pollo / Huevo</span>
                </div>
            )}

            {/* Lista de Platillos - Con hover sutil y bordes punteados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {menuData[category].map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-dashed border-white/20 pb-5 group hover:translate-x-1 transition-transform duration-300">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-signeta text-2xl md:text-3xl text-white leading-tight flex-grow uppercase group-hover:text-[#FFAC04] transition-colors rotulo-subtitle">
                      {item.name}
                    </h3>
                    <div className="flex flex-col items-end mt-1">
                      {item.price.includes('|') ? (
                        item.price.split('|').map((p, i) => (
                          <span key={i} className="font-signeta text-[#FFAC04] text-lg md:text-xl whitespace-nowrap drop-shadow-md text-right">
                            {p.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="font-signeta text-[#FFAC04] text-xl md:text-2xl whitespace-nowrap drop-shadow-md">
                          {item.price}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.desc && (
                    <p className="font-sans text-sm md:text-base leading-relaxed text-white/80 font-light pr-4">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )})}
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#003B2D] text-white pt-16 pb-8 px-6 w-full border-t-[8px] border-[#FFAC04] relative overflow-hidden" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="font-signeta text-5xl md:text-6xl tracking-widest text-[#FFAC04] mb-1 block logo-shadow">LA POPULAR</span>
              <span className="font-amentha text-2xl text-white drop-shadow-md opacity-90">Cruderia de Barrio</span>
            </div>
            <div className="mt-12 lg:mt-auto">
              <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/60 mb-2">Llámanos</p>
              <p className="font-signeta text-4xl tracking-widest mt-2 text-[#FFAC04] rotulo-subtitle">614 530 4495</p>
            </div>
          </div>

          <div>
            <h3 className="font-signeta text-3xl md:text-4xl tracking-widest mb-6 text-[#FFAC04] rotulo-subtitle">Horario</h3>
            <ul className="font-sans font-normal text-sm space-y-3 text-white/90">
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">LUNES</span> <span>12 pm - 12 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">MARTES</span> <span>12 pm - 12 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">MIÉRCOLES</span> <span>12 pm - 2 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">JUEVES</span> <span>12 pm - 2 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">VIERNES</span> <span>12 pm - 2 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">SÁBADO</span> <span>12 pm - 2 am</span></li>
              <li className="flex justify-between w-full max-w-[260px]"><span className="text-white/60 font-semibold">DOMINGO</span> <span>12 pm - 12 am</span></li>
            </ul>
          </div>

          <div className="text-left lg:text-center flex flex-col items-start lg:items-center justify-start lg:justify-center relative">
            <div className="mb-10 z-10 relative w-full">
              <p className="font-sans font-bold text-sm tracking-[0.1em] uppercase mb-2 text-[#FFAC04]">Sucursal Centro</p>
              <p className="font-sans text-sm lg:max-w-[260px] lg:mx-auto leading-relaxed text-white/80">Blvd. Gustavo Díaz Ordaz 101,<br />Chihuahua</p>
            </div>
            <div className="z-10 relative w-full">
              <p className="font-sans font-bold text-sm tracking-[0.1em] uppercase mb-2 text-[#FFAC04]">Sucursal Cantera</p>
              <p className="font-sans text-sm lg:max-w-[260px] lg:mx-auto leading-relaxed text-white/80">Av. La Cantera 5900, Plaza Rayuela,<br />Chihuahua</p>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-between h-full">
            <div className="flex space-x-6 mb-12 lg:mb-0">
              <a href="https://www.facebook.com/Teofilitoscuu/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFAC04] hover:-translate-y-1 transition-all"><FacebookIcon size={32} /></a>
              <a href="https://www.instagram.com/teofilitos_cantina?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFAC04] hover:-translate-y-1 transition-all"><InstagramIcon size={32} /></a>
              <a href="https://wa.me/526145304495" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#FFAC04] hover:-translate-y-1 transition-all"><Phone size={32} /></a>
            </div>

            <div className="flex flex-col w-full lg:max-w-[220px] space-y-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full border-2 border-white/80 text-white/90 rounded py-3 font-sans font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[#004B3A] transition-colors">
                Ir Arriba
              </button>
              <button onClick={() => setReservationOpen(true)} className="w-full bg-[#FFAC04] text-[#004B3A] rounded py-3 font-sans font-bold text-sm uppercase tracking-wider hover:bg-[#e59b04] transition-colors border-b-4 border-[#c48403] active:border-b-0 active:translate-y-1">
                Reservaciones
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuDigital;
