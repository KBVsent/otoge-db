# import ipdb
import requests
import urllib.request
import json
from maimai.paths import *
from shared.common_func import *

def load_new_song_data():
    with open(LOCAL_MUSIC_JSON_PATH, 'r', encoding='utf-8') as f:
        local_music_data = json.load(f)
        local_music_map = _json_to_id_value_map(local_music_data)

    server_music_data = requests.get(SERVER_MUSIC_DATA_URL).json()
    server_music_map = _json_to_id_value_map(server_music_data)

    if len(server_music_map) > len(local_music_map):
        with open(LOCAL_MUSIC_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(server_music_data, f, ensure_ascii=False, indent=2)

    return [server_music_map[id] for id in server_music_map if id not in local_music_map]


def _json_to_id_value_map(json):
    return {int(song['id']):song for song in json}


def renew_music_ex_data(new_song_list, args):
    if len(new_song_list) == 0:
        print_message("Nothing updated", '', args)
        return

    f = open("diffs.txt", 'w')

    with open(LOCAL_MUSIC_EX_JSON_PATH, 'r', encoding='utf-8') as f:
        local_music_ex_data = json.load(f)

    for song in new_song_list:
        _download_song_jacket(song)
        _add_song_data_to_ex_data(song, local_music_ex_data)
        print_message(f"New song added: {song}", bcolors.OKGREEN, args)
        
        if not skipwiki:
            _update_song_wiki_data(song, args)
            
        _record_new_song_jacket_id(song)

    with open(LOCAL_MUSIC_EX_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(local_music_ex_data, f, ensure_ascii=False, indent=2)


def _download_song_jacket(song):
    urllib.request.urlretrieve(SERVER_MUSIC_JACKET_BASE_URL + song['image_url'], 'jacket/' + song['image_url'])

def _record_new_song_jacket_id(song):
    with open(LOCAL_DIFFS_LOG_PATH, 'a', encoding='utf-8') as f:
        f.write('jacket/' + song['image_url'] + '\n')


def _add_song_data_to_ex_data(song, ex_data):
    ex_data.append(_add_ex_data_template(song))

def _add_ex_data_template(song):
    song['bpm'] = ""
    song['lev_bas_i'] = ""
    song['lev_bas_notes'] = ""
    song['lev_bas_notes_tap'] = ""
    song['lev_bas_notes_hold'] = ""
    song['lev_bas_notes_slide'] = ""
    song['lev_bas_notes_touch'] = ""
    song['lev_bas_notes_break'] = ""
    song['lev_bas_designer'] = ""
    song['lev_bas_chart_link'] = ""
    song['lev_adv_i'] = ""
    song['lev_adv_notes'] = ""
    song['lev_adv_notes_tap'] = ""
    song['lev_adv_notes_hold'] = ""
    song['lev_adv_notes_slide'] = ""
    song['lev_adv_notes_touch'] = ""
    song['lev_adv_notes_break'] = ""
    song['lev_adv_designer'] = ""
    song['lev_adv_chart_link'] = ""
    song['lev_exp_i'] = ""
    song['lev_exp_notes'] = ""
    song['lev_exp_notes_tap'] = ""
    song['lev_exp_notes_hold'] = ""
    song['lev_exp_notes_slide'] = ""
    song['lev_exp_notes_touch'] = ""
    song['lev_exp_notes_break'] = ""
    song['lev_exp_designer'] = ""
    song['lev_exp_chart_link'] = ""
    song['lev_mas_i'] = ""
    song['lev_mas_notes'] = ""
    song['lev_mas_notes_tap'] = ""
    song['lev_mas_notes_hold'] = ""
    song['lev_mas_notes_slide'] = ""
    song['lev_mas_notes_touch'] = ""
    song['lev_mas_notes_break'] = ""
    song['lev_mas_designer'] = ""
    song['lev_mas_chart_link'] = ""
    song['lev_ult_i'] = ""
    song['lev_ult_notes'] = ""
    song['lev_ult_notes_tap'] = ""
    song['lev_ult_notes_hold'] = ""
    song['lev_ult_notes_slide'] = ""
    song['lev_ult_notes_touch'] = ""
    song['lev_ult_notes_break'] = ""
    song['lev_ult_designer'] = ""
    song['lev_ult_chart_link'] = ""
    song['lev_we_notes'] = ""
    song['lev_we_notes_tap'] = ""
    song['lev_we_notes_hold'] = ""
    song['lev_we_notes_slide'] = ""
    song['lev_we_notes_touch'] = ""
    song['lev_we_notes_break'] = ""
    song['lev_we_designer'] = ""
    song['lev_we_chart_link'] = ""
    song['version'] = ""
    song['wikiwiki_url'] = ""
    song['date'] = ""

    return song
