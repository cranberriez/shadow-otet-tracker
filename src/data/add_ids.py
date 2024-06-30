import json
import os

# List of JSON file names
files = [
    "revered_spirit_ashes.json",
    "scadutree_fragments.json"
]

# Function to generate unique decimal IDs
def generate_ids(files, data_dir):
    current_id = 368.0
    for file in files:
        file_path = os.path.join(data_dir, file)
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        for item in data:
            item['id'] = round(current_id, 1)
            current_id += 1
            if 'pieces' in item and isinstance(item['pieces'], list) and len(item['pieces']) > 0:
                piece_id = current_id - 1 + 0.1
                item['set_completion'] = 0
                for piece in item['pieces']:
                    piece['id'] = round(piece_id, 1)
                    item['set_completion'] += 1
                    piece_id += 0.1
                current_id = int(current_id) + 1  # Ensure the next item gets a whole number ID

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

# Directory containing JSON files
data_dir = ""  # Adjust the path accordingly

# Add unique IDs to items in all JSON files
generate_ids(files, data_dir)
