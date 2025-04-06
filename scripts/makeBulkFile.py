import json

def generate_bulk_file(input_file: str, output_file: str):
    try:
        with open(input_file, 'r') as infile:
            products = json.load(infile)

        with open(output_file, 'w') as outfile:
            for product in products:
                # Prepare the metadata for the bulk API
                action_metadata = {
                    "index": {
                        "_index": "products",  # Replace with your Elasticsearch index name
                        "_id": product.get("id")
                    }
                }
                outfile.write(json.dumps(action_metadata) + "\n")

                # Prepare the product document, ensuring compatibility with the mapping
                product_document = {
                    "id": product.get("id", ""),
                    "title": product.get("title", ""),
                    "sku": product.get("sku", ""),
                    "description": product.get("description", ""),
                    "breadcrumbs": " > ".join(product.get("breadcrumbs", [])),
                    "features": " | ".join(product.get("features", [])),
                    "specs": [
                        {"key": spec.get("key", ""), "value": spec.get("value", "")}
                        for spec in product.get("specs", [])
                    ],
                    "unit_price":(product.get("unit_price", 0.0)),
                    "stock": int(product.get("stock", 0))
                }
                outfile.write(json.dumps(product_document) + "\n")

        print(f"Bulk file created successfully: {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Replace 'products.json' and 'bulk_output.ndjson' with your actual file paths
infile = "/Users/home/Projects/Store/data/products.json"
outfile = "/Users/home/Projects/Store/data/prod_index.json"
generate_bulk_file(infile,outfile)
