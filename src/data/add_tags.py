import json

# List of JSON files to process
files = [
    "revered_spirit_ashes.json",
    "scadutree_fragments.json"
]

def generate_tags(item):
    tags = []
    if 'spoiler' in item and item['spoiler']:
        tags.append('spoiler')
    if 'location_text' in item:
        if 'Remembrance' in item['location_text'] or 'Purchased at Roundtable Hold' in item['location_text']:
            tags.append('boss')
        if 'quest' in item['location_text'].lower():
            tags.append('quest')
        if 'missable' in item['location_text'].lower():
            tags.append('missable')
    return tags

# Process each file
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for item in data:
        item['tags'] = generate_tags(item)
        if 'pieces' in item and item['pieces']:
            for piece in item['pieces']:
                piece['tags'] = generate_tags(piece)
    
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

print("Tags added successfully to all items.")
