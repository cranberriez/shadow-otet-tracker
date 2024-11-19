import json
import requests
import time
import random
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

MAX_RETRIES = 5
BASE_DELAY = 1

def get_random_user_agent():
    ua = UserAgent()
    return ua.random

def scrape_item_data(item):
    retries = 0
    while retries < MAX_RETRIES:
        try:
            headers = {'User-Agent': get_random_user_agent()}
            response = requests.get(item['url'], headers=headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                h3_bonfire = soup.find('h3', class_='bonfire')
                if not h3_bonfire:
                    print(f"Bonfire section not found for {item['name']} at {item['url']}")
                    return item

                ul_element = h3_bonfire.find_next('ul')
                if not ul_element:
                    print(f"UL element not found after bonfire for {item['name']} at {item['url']}")
                    return item

                li_elements = ul_element.find_all('li')
                if li_elements:
                    item['details'] = [str(li) for li in li_elements]
                else:
                    print(f"No list items found for {item['name']} at {item['url']}")
                
                return item
            elif response.status_code == 403:
                retries += 1
                delay = min(BASE_DELAY * (2 ** retries), 8)  # Exponential backoff
                print(f"403 Forbidden for {item['url']}, retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print(f"Failed to retrieve {item['url']}, status code: {response.status_code}")
                return item
        except Exception as e:
            print(f"Error scraping {item['name']} at {item['url']}: {e}")
            return item
    print(f"Max retries reached for {item['name']} at {item['url']}")
    return item

def process_details(details):
    if not details:
        return None, None

    detail = details[0]
    soup = BeautifulSoup(detail, 'html.parser')
    result_text = soup.get_text(" ", strip=True).replace("[", "").replace("]", "").strip()
    
    map_link = None
    for link in soup.find_all('a', class_='wiki_link'):
        if 'Map' in link.text:
            map_link = 'https://eldenring.wiki.fextralife.com' + link['href']
            break

    return result_text, map_link

def process_item(item):
    item = scrape_item_data(item)
    location_text, map_url = process_details(item.get('details', []))
    item['detailed_location_text'] = location_text
    item['map_url'] = map_url
    return item

def process_file(file_name):
    try:
        with open(file_name, 'r') as f:
            items = json.load(f)

        processed_items = []
        for item in items:
            print(f"Scraping and processing {item['name']} from {file_name}...")
            processed_item = process_item(item)
            processed_items.append(processed_item)
            time.sleep(random.uniform(5, 10))  # Random delay between 5 to 10 seconds

        with open(file_name, 'w') as f:
            json.dump(processed_items, f, indent=4)

        print(f"Finished processing {file_name}.")
    except Exception as e:
        print(f"Error processing file {file_name}: {e}")

files = [
    "armor.json",
    "ashes_of_war.json",
    "bell_bearings.json",
    "cookbooks.json",
    "spells.json",
    "spirit_ashes.json",
    "talismans.json",
    "weapons.json",
    "tears.json",
    "tools.json"
]

def main():
    for file in files:
        process_file(file)

if __name__ == "__main__":
    main()
