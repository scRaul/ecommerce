# from products_og, parse the model from the title field, append model field
import json


def modify_json_file(input_file, output_file):
    try:
        # Read the JSON file
        with open(input_file, 'r') as file:
            data = json.load(file)

        # Ensure the data is a list of dictionaries
        if not isinstance(data, list):
            raise ValueError("JSON file must contain an array of objects")

        # Process each entry in the JSON array
        updated_data = []
        for entry in data:
            # Example: Extract substring from 'fieldA' to create 'newField'
            if 'name' in entry:
                entry['model'] = entry['name'].split(" ")[0]  # Adjust logic as needed
            updated_data.append(entry)

        # Write the updated data back to a new file
        with open(output_file, 'w') as file:
            json.dump(updated_data, file, indent=2)

        print(f"Updated JSON saved to {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Usage example
modify_json_file('/Users/home/Projects/Store/data/products_og.json', '/Users/home/Projects/Store/data/products.json')
