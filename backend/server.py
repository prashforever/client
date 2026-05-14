from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Manghani Toy Worldwide API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    category: str
    category_slug: str
    image: str
    images: List[str] = []
    rating: float = 4.5
    reviews_count: int = 0
    stock: int = 50
    badge: Optional[str] = None
    features: List[str] = []
    trending: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    rating: int = 5
    comment: str
    avatar: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReviewCreate(BaseModel):
    name: str
    location: str
    rating: int = 5
    comment: str


class Category(BaseModel):
    slug: str
    name: str
    description: str
    image: str


# ---------- Seed Data ----------
CATEGORIES_SEED = [
    {
        "slug": "remote-control-cars",
        "name": "Remote Control Cars",
        "description": "High-speed RC vehicles for thrill seekers",
        "image": "https://images.unsplash.com/photo-1588351902634-cd48b4afd5c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwcmVtb3RlJTIwY29udHJvbCUyMGNhcnxlbnwwfHx8fDE3Nzg2NTkzODh8MA&ixlib=rb-4.1.0&q=85",
    },
    {
        "slug": "kids-toys",
        "name": "Kids Toys",
        "description": "Imaginative play for every age",
        "image": "https://images.unsplash.com/photo-1758687126192-98f54f4b747f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwa2lkcyUyMHRveXN8ZW58MHx8fHwxNzc4NjU5Mzg4fDA&ixlib=rb-4.1.0&q=85",
    },
    {
        "slug": "gaming-accessories",
        "name": "Gaming Accessories",
        "description": "Level up your setup",
        "image": "https://images.unsplash.com/photo-1763422390035-38e00d5db9c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBnYW1pbmclMjBhY2Nlc3Nvcmllc3xlbnwwfHx8fDE3Nzg2NTkzODh8MA&ixlib=rb-4.1.0&q=85",
    },
    {
        "slug": "speakers-electronics",
        "name": "Speakers & Electronics",
        "description": "Premium audio & smart devices",
        "image": "https://images.unsplash.com/photo-1588516206638-332ee6c8c3d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwd2lyZWxlc3MlMjBzcGVha2VyfGVufDB8fHx8MTc3ODY1OTM4OHww&ixlib=rb-4.1.0&q=85",
    },
]

PRODUCTS_SEED = [
    # Remote Control Cars
    {
        "name": "Thunderbolt Pro 4WD Drift Racer",
        "description": "Professional grade 4WD remote-controlled drift car with brushless motor, reaching speeds up to 70 km/h. Built with carbon fiber chassis and aluminum suspension for the ultimate racing experience.",
        "price": 189.99, "original_price": 249.99,
        "category": "Remote Control Cars", "category_slug": "remote-control-cars",
        "image": "https://images.unsplash.com/photo-1605618826115-fb9e775cf2c2?w=800&q=85",
        "rating": 4.8, "reviews_count": 124, "badge": "Bestseller", "trending": True,
        "features": ["Brushless 540 motor", "4WD drift system", "2.4GHz remote", "Carbon fiber chassis"],
    },
    {
        "name": "Stealth Rock Crawler X9",
        "description": "Conquer any terrain with this off-road monster. Independent suspension, oversized tires, and waterproof electronics make it unstoppable.",
        "price": 149.00, "original_price": 199.00,
        "category": "Remote Control Cars", "category_slug": "remote-control-cars",
        "image": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&q=85",
        "rating": 4.7, "reviews_count": 86, "badge": "Hot", "trending": True,
        "features": ["Waterproof electronics", "Real shock suspension", "All-terrain tires"],
    },
    {
        "name": "Mini Velocity RC Sports Coupe",
        "description": "Compact yet powerful sports coupe with realistic detailing. Perfect for indoor and outdoor racing.",
        "price": 79.99,
        "category": "Remote Control Cars", "category_slug": "remote-control-cars",
        "image": "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800&q=85",
        "rating": 4.6, "reviews_count": 52,
        "features": ["LED headlights", "USB charging", "25 km/h top speed"],
    },
    {
        "name": "Apex Buggy Turbo Edition",
        "description": "Race-tuned 1:10 scale buggy with adjustable suspension and high-torque motor.",
        "price": 219.50, "original_price": 279.00,
        "category": "Remote Control Cars", "category_slug": "remote-control-cars",
        "image": "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=85",
        "rating": 4.9, "reviews_count": 211, "badge": "Premium", "trending": True,
        "features": ["1:10 scale", "Adjustable suspension", "Pro-grade ESC"],
    },

    # Kids Toys
    {
        "name": "Cosmic Builder Mega Set 1200pc",
        "description": "Ignite creativity with 1200 interlocking pieces. Build galaxies, vehicles, robots and more.",
        "price": 89.99,
        "category": "Kids Toys", "category_slug": "kids-toys",
        "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=85",
        "rating": 4.9, "reviews_count": 340, "badge": "Editor's Pick", "trending": True,
        "features": ["1200 pieces", "Age 6+", "Eco-friendly ABS plastic"],
    },
    {
        "name": "Wooden Heirloom Train Set",
        "description": "Handcrafted wooden train set with 50 pieces, magnetic connectors and FSC-certified wood.",
        "price": 64.00,
        "category": "Kids Toys", "category_slug": "kids-toys",
        "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=85",
        "rating": 4.8, "reviews_count": 178,
        "features": ["FSC certified wood", "Non-toxic paint", "50 magnetic pieces"],
    },
    {
        "name": "Plush Companion — Bear Edition",
        "description": "Ultra-soft hypoallergenic plush companion. Hand-stitched details, weighted body for comforting cuddles.",
        "price": 39.99, "original_price": 54.99,
        "category": "Kids Toys", "category_slug": "kids-toys",
        "image": "https://images.unsplash.com/photo-1559454403-b8fb88521f9e?w=800&q=85",
        "rating": 4.7, "reviews_count": 95, "badge": "Gift Pick",
        "features": ["Hypoallergenic fill", "Hand stitched", "Machine washable"],
    },
    {
        "name": "STEM Lab Junior Robotics Kit",
        "description": "Introductory robotics kit for young engineers. Build, code and play with included tablet app.",
        "price": 119.00,
        "category": "Kids Toys", "category_slug": "kids-toys",
        "image": "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=85",
        "rating": 4.8, "reviews_count": 142, "badge": "STEM", "trending": True,
        "features": ["App-based coding", "Rechargeable", "Age 8+"],
    },

    # Gaming Accessories
    {
        "name": "Sentinel Pro Wireless Controller",
        "description": "Tournament grade wireless controller with Hall-effect sticks, 40h battery life and ultra-low latency.",
        "price": 169.00, "original_price": 219.00,
        "category": "Gaming Accessories", "category_slug": "gaming-accessories",
        "image": "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=85",
        "rating": 4.9, "reviews_count": 412, "badge": "New", "trending": True,
        "features": ["Hall-effect sticks", "40h battery", "Bluetooth 5.3"],
    },
    {
        "name": "Aurora RGB Mechanical Keyboard",
        "description": "75% layout, hot-swappable switches and per-key RGB. Built for esports and creators alike.",
        "price": 149.00,
        "category": "Gaming Accessories", "category_slug": "gaming-accessories",
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=85",
        "rating": 4.8, "reviews_count": 289,
        "features": ["Hot-swappable", "Per-key RGB", "PBT keycaps"],
    },
    {
        "name": "Vortex 8K Esports Mouse",
        "description": "Ultra-light 58g esports mouse with 8000Hz polling and flagship optical sensor.",
        "price": 99.50, "original_price": 129.00,
        "category": "Gaming Accessories", "category_slug": "gaming-accessories",
        "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=85",
        "rating": 4.7, "reviews_count": 156, "badge": "Esports",
        "features": ["58g ultralight", "8000Hz polling", "26000 DPI sensor"],
    },
    {
        "name": "Nimbus Pro Gaming Headset",
        "description": "Studio-grade 50mm drivers, broadcast-quality mic and memory-foam cushions for marathon sessions.",
        "price": 139.00,
        "category": "Gaming Accessories", "category_slug": "gaming-accessories",
        "image": "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=85",
        "rating": 4.8, "reviews_count": 203, "trending": True,
        "features": ["50mm drivers", "Detachable mic", "Memory foam"],
    },

    # Speakers & Electronics
    {
        "name": "Aurora Studio Bluetooth Speaker",
        "description": "360° immersive sound with 24h playback, IP67 dust/water resistance and premium aluminum body.",
        "price": 249.00, "original_price": 329.00,
        "category": "Speakers & Electronics", "category_slug": "speakers-electronics",
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=85",
        "rating": 4.9, "reviews_count": 521, "badge": "Premium", "trending": True,
        "features": ["360° sound", "IP67 rating", "24h battery"],
    },
    {
        "name": "Echo Tower Smart Home Speaker",
        "description": "Floor-standing smart speaker with multi-room audio, voice assistant and rich bass.",
        "price": 399.00,
        "category": "Speakers & Electronics", "category_slug": "speakers-electronics",
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=85",
        "rating": 4.7, "reviews_count": 134,
        "features": ["Multi-room", "Voice assistant", "Hi-Res audio"],
    },
    {
        "name": "Nimbus Pro Wireless Earbuds",
        "description": "Active noise cancelling earbuds with 30h case battery and studio-tuned drivers.",
        "price": 159.00, "original_price": 199.00,
        "category": "Speakers & Electronics", "category_slug": "speakers-electronics",
        "image": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=85",
        "rating": 4.8, "reviews_count": 298, "badge": "Hot",
        "features": ["ANC", "30h battery", "Wireless charging"],
    },
    {
        "name": "Lumen Smart Projector 4K",
        "description": "Cinema-quality 4K projector with auto-keystone, Wi-Fi streaming and integrated Dolby audio.",
        "price": 799.00,
        "category": "Speakers & Electronics", "category_slug": "speakers-electronics",
        "image": "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=800&q=85",
        "rating": 4.9, "reviews_count": 87, "badge": "Flagship", "trending": True,
        "features": ["4K UHD", "Dolby audio", "Auto-keystone"],
    },
]

REVIEWS_SEED = [
    {
        "name": "Aarav Patel", "location": "Mumbai, India", "rating": 5,
        "comment": "Absolutely premium quality. The packaging itself feels like opening an Apple product. Manghani is now my go-to.",
        "avatar": "https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?w=200&q=85",
    },
    {
        "name": "Sophie Laurent", "location": "Paris, France", "rating": 5,
        "comment": "Worldwide shipping was lightning fast and the RC car my son got is a dream. Customer service replied within minutes on WhatsApp.",
        "avatar": "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&q=85",
    },
    {
        "name": "Marcus Reid", "location": "London, UK", "rating": 5,
        "comment": "Bought the Aurora speaker and the Nimbus headset. Both feel flagship. This brand punches above its weight.",
        "avatar": "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=200&q=85",
    },
]


async def seed_database():
    products_count = await db.products.count_documents({})
    if products_count == 0:
        seeded = []
        for p in PRODUCTS_SEED:
            doc = Product(**p).model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            seeded.append(doc)
        await db.products.insert_many(seeded)
        logger.info(f"Seeded {len(seeded)} products")

    cat_count = await db.categories.count_documents({})
    if cat_count == 0:
        await db.categories.insert_many([dict(c) for c in CATEGORIES_SEED])
        logger.info(f"Seeded {len(CATEGORIES_SEED)} categories")

    rev_count = await db.reviews.count_documents({})
    if rev_count == 0:
        rev_docs = []
        for r in REVIEWS_SEED:
            doc = Review(**r).model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            rev_docs.append(doc)
        await db.reviews.insert_many(rev_docs)
        logger.info(f"Seeded {len(rev_docs)} reviews")


@app.on_event("startup")
async def startup_event():
    await seed_database()


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Manghani Toy Worldwide API"}


@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    cats = await db.categories.find({}, {"_id": 0}).to_list(100)
    return cats


@api_router.get("/products", response_model=List[Product])
async def list_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    trending: Optional[bool] = Query(None),
    limit: int = Query(100, le=200),
):
    query = {}
    if category:
        query["category_slug"] = category
    if trending is not None:
        query["trending"] = trending
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}},
        ]
    products = await db.products.find(query, {"_id": 0}).limit(limit).to_list(limit)
    return products


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@api_router.get("/reviews", response_model=List[Review])
async def list_reviews():
    revs = await db.reviews.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return revs


@api_router.post("/reviews", response_model=Review)
async def create_review(payload: ReviewCreate):
    review = Review(**payload.model_dump())
    doc = review.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reviews.insert_one(doc)
    return review


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
