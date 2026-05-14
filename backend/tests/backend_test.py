"""Backend tests for Manghani Toy Worldwide API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://manghani-premium.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "Manghani" in r.json().get("message", "")


def test_categories(client):
    r = client.get(f"{API}/categories")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 4
    slugs = {c["slug"] for c in data}
    assert {"remote-control-cars", "kids-toys", "gaming-accessories", "speakers-electronics"} == slugs
    for c in data:
        assert "_id" not in c


def test_products_list(client):
    r = client.get(f"{API}/products")
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 16
    for p in data:
        assert "_id" not in p
        assert "id" in p and "name" in p and "price" in p


def test_products_filter_category(client):
    r = client.get(f"{API}/products", params={"category": "remote-control-cars"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    for p in data:
        assert p["category_slug"] == "remote-control-cars"


def test_products_search(client):
    r = client.get(f"{API}/products", params={"search": "speaker"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    for p in data:
        hay = (p["name"] + p["description"] + p["category"]).lower()
        assert "speaker" in hay


def test_products_trending(client):
    r = client.get(f"{API}/products", params={"trending": "true"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    assert all(p["trending"] is True for p in data)


def test_product_detail_and_404(client):
    r = client.get(f"{API}/products")
    pid = r.json()[0]["id"]
    d = client.get(f"{API}/products/{pid}")
    assert d.status_code == 200
    assert d.json()["id"] == pid
    assert "_id" not in d.json()
    nf = client.get(f"{API}/products/nonexistent-id-xyz")
    assert nf.status_code == 404


def test_reviews_get(client):
    r = client.get(f"{API}/reviews")
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 3
    for rv in data:
        assert "_id" not in rv


def test_reviews_post(client):
    payload = {"name": "TEST_Reviewer", "location": "Testville", "rating": 4, "comment": "TEST_comment_e2e"}
    r = client.post(f"{API}/reviews", json=payload)
    assert r.status_code == 200
    body = r.json()
    assert body["name"] == "TEST_Reviewer"
    assert body["rating"] == 4
    assert "_id" not in body
    # verify persistence
    listing = client.get(f"{API}/reviews").json()
    assert any(x.get("comment") == "TEST_comment_e2e" for x in listing)
