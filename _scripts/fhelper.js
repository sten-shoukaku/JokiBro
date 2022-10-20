var PAGEDIR = '_pages/'
var JSONDIR = '_json/'
var ARTDIR = '_img/game_art/'
var JARTDIR = '_img/jockey_art/'

async function fetch_json(file){
    try{
        let response = await fetch(
            JSONDIR +
            file +
            '.json', {
                method: 'GET',
                credentials: 'same-origin'
            }
        )
        let data = await response.json()
        return data
    } catch(e){
        console.error(e)
    }
}

async function get_json(file){
    let data = await fetch_json(file)
    return data
}

function load_content(page){
    $('#container').load(
        PAGEDIR +
        page +
        '.html'
    )
    curr = page
}