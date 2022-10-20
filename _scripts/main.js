'use strict'

let curr = 'Home'
let prev = null

const e = React.createElement
const dom_container = document.querySelector('#container')
const root = ReactDOM.createRoot(dom_container)

function load_home(){
    root.render(<Home/>)
}

function load_gamepage(art, title, dev){
    root.render(
        <GamePage
            art={art}
            title={title}
            dev={dev}/>
    )
}

function search_game(){
    let query = $('#search-text').val()
    let result = search_query()
    const THRESHOLD = 5
    const COUNT = (THRESHOLD < result.length ? THRESHOLD : result.length)
    let search_result = []
    for(let i = 0; i < COUNT; i++){
        search_result.push(result[i])
    }
    root.render(
        <SearchResult
            query={query}
            search_result={search_result}/>
    )
}

function order_show_jockey(title, art, dev){
    root.render(
        <JockeyList
            title={title}
            art={art}
            dev={dev}
            count={JOCKEYS.length}/>
    )
}

class SearchResultNode extends React.Component{
    render(){
        return(
            <div
                className="result-node-container"
                onClick={() => {
                    {load_gamepage(ARTDIR + this.props.art, this.props.title, this.props.dev)}
                }}>
                <img
                    className="result-node-art"
                    src={ARTDIR + this.props.art}/>
                <div
                    className="result-node-desc">
                    <h3
                        className="text-maincolor result-node-title">
                        {this.props.title}
                    </h3>
                    <p
                        className="text-maincolor result-node-dev">
                        {this.props.dev}
                    </p>
                </div>
            </div>
        )
    }
}

class SearchResult extends React.Component{
    render(){
        const result = this.props.search_result
        const games = []
        for(let i = 0;  i < result.length; i++){
            let id = result[i][0]
            games.push(
                <SearchResultNode
                    key={GAMES[id]['title']}
                    art={GAMES[id]['art']}
                    title={GAMES[id]['title']}
                    dev={GAMES[id]['developer']}/>
            )
        }
        return(
            <React.Fragment>
                <h1 className="text-maincolor subsection-title">
                    Search Result For "{this.props.query}"
                </h1>
                <div
                    id="search-result-container">
                    {games}
                </div>
            </React.Fragment>
        )
    }
}

class SectionTitle extends React.Component{
    render(){
        return(
            <h1 className="text-maincolor subsection-title">{this.props.text}</h1>
        )
    }
}

class GameGrid extends React.Component{
    render(){
        return(
            <React.Fragment>
                <button 
                    className="grid-game-container"
                    onClick={() => {
                        {load_gamepage(this.props.art, this.props.title, this.props.dev)}
                    }}
                    type="button">
                    <img 
                        src={this.props.art}
                        className="grid-game-art"/>
                    <div className="grid-game-desc">
                        <h3
                            className="grid-game-title">
                            {this.props.title}
                        </h3>
                    </div>
                </button>
            </React.Fragment>
        )
    }
}

class GameList extends React.Component{
    render(){
        const GAMES_COUNT = this.props.games_count
        const COUNT = (GAMES_COUNT < GAMES.length ? GAMES_COUNT : GAMES.length)
        const games = []
        for(let i = 0; i < COUNT; i++){
            let game = GAMES[i]
            games.push(
                <GameGrid 
                    key={game['title']}
                    art={ARTDIR + game['art']}
                    title={game['title']}
                    dev={game['developer']}/>
            )
        }
        return(
            <div id="home-trending-container">
                {games}
            </div>
        )
    }
}

class JockeyOrderMenu extends React.Component{
    render(){
        return(
            <React.Fragment>
                <button
                    onClick = {() => alert("This feature hasn't been implemented yet :sadge:")}
                    className="jockey-order-menu-button text-maincolor"
                    id="jockey-order-menu-button-message">
                    Message
                </button>
                <button
                    onClick = {() => alert("Successfully placed a " + this.props.title + " order for " + this.props.name)}
                    className="jockey-order-menu-button text-maincolor"
                    id="jockey-order-menu-button-order">
                    Place Order
                </button>
                <button
                    onClick = {() => alert('Successfully reported ' + this.props.name)}
                    className="jockey-order-menu-button text-maincolor"
                    id="jockey-order-menu-button-report">
                    Report
                </button>
            </React.Fragment>
        )
    }
}

class JockeyListNode extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show_menu: false
        }
        this.toogle_menu = this.toggle_menu.bind(this)
    }

    toggle_menu(){
        this.setState(
            {
                show_menu: !this.state.show_menu
            }
        )
    }
    
    render(){
        return(
            <React.Fragment>
                <div
                    onClick = {() => this.toogle_menu()}
                    className="jockey-list-container">
                    <img
                        src={JARTDIR + this.props.art}
                        className="jockey-list-art"/>
                    <div
                        className="jockey-list-desc">
                        <h3
                            className="jockey-list-name">
                            {this.props.name}
                        </h3>
                        <p
                            className="jockey-list-price">
                            Starts from {this.props.price}
                        </p>
                    </div>
                </div>
                <div
                    className="jockey-order-menu-container">
                    {
                        this.state.show_menu ?
                            <JockeyOrderMenu
                                name={this.props.name}
                                title={this.props.title}/>
                        : null
                    }
                </div>
            </React.Fragment>
        )
    }
}

class JockeyList extends React.Component{
    render(){
        const jockey = []
        const COUNT = (this.props.count < JOCKEYS.length ? this.props.count : JOCKEYS.length)
        for(let i = 0; i < COUNT; i++){
            jockey.push(
                <JockeyListNode
                    key={i}
                    name={JOCKEYS[i][0]}
                    art={JOCKEYS[i][1]}
                    price={JOCKEYS[i][2]}
                    title={this.props.title}/>
            )
        }
        return(
            <React.Fragment>
                <div
                    className="back-container">
                    <a
                        className="page-back subsection-title"
                        href="#"
                        onClick={() => {
                            {load_gamepage(this.props.art, this.props.title, this.props.dev)}
                        }}>
                        Back
                    </a>
                </div>
                <div
                    className="game-recommended-jockey">
                    <h1
                        className="text-maincolor">
                        Available Jockey
                    </h1>
                    {jockey}
                </div>
            </React.Fragment>
        )
    }
}

class JockeyGrid extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div 
                    className="grid-jockey-container">
                    <img 
                        src={JARTDIR + this.props.art}
                        className="grid-jockey-art"/>
                    <div className="grid-jockey-desc">
                        <h3
                            className="grid-jockey-name">
                            {this.props.name}
                        </h3>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class TopJockey extends React.Component{
    render(){
        const JOCKEY_COUNT = 10
        const COUNT = (JOCKEY_COUNT < JOCKEYS.length ? JOCKEY_COUNT : JOCKEYS.length)
        const jockey = []
        for(let i = 0; i < COUNT; i++){
            jockey.push(
                <JockeyGrid 
                    key={i}
                    name={JOCKEYS[i][0]}
                    art={JOCKEYS[i][1]}/>
            )
        }
        return(
            <div id="top-jockey-container">
                {jockey}
            </div>
        )
    }
}

class Home extends React.Component{
    render(){
        return(
            <React.Fragment>
                <SectionTitle text = "Trending Games"/>
                <GameList
                    games_count={10}/>
                <div className="center-div">
                    <button
                        className="show-all-games"
                        onClick={() => {
                            {
                                root.render(
                                    <React.Fragment>
                                        <div
                                            className="back-container">
                                            <a
                                                className="page-back subsection-title"
                                                href="#"
                                                onClick={() => {
                                                    {
                                                        root.render(<Home/>)
                                                    }
                                                }}>
                                                Back
                                            </a>
                                        </div>
                                        <SectionTitle text = "All Games"/>
                                        <GameList
                                            games_count={GAMES.length}/>
                                    </React.Fragment>
                                )
                            }
                        }}>
                        All Games
                    </button>
                </div>
                <SectionTitle text = "Top Jockey"/>
                <TopJockey/>
            </React.Fragment>
        )
    }
}

class GamePage extends React.Component{
    render(){
        const jockey = []
        const JOCKEY_COUNT = 5
        const COUNT = (JOCKEY_COUNT < JOCKEYS.length ? JOCKEY_COUNT : JOCKEYS.length)
        for(let i = 0; i < COUNT; i++){
            jockey.push(
                <JockeyListNode
                    key={i}
                    name={JOCKEYS[i][0]}
                    art={JOCKEYS[i][1]}
                    price={JOCKEYS[i][2]}
                    title={this.props.title}/>
            )
        }
        return(
            <React.Fragment>
                <div
                    className="back-container">
                    <a
                        className="page-back subsection-title"
                        href="#"
                        onClick={() => {
                            {
                                root.render(<Home/>)
                            }
                        }}>
                        Back
                    </a>
                </div>
                <div
                    className="gamepage-main-container">
                    <div
                        className="game-desc-container">
                        <img
                            src={this.props.art}
                            id="game-desc-art"/>
                        <div
                            id="game-desc">
                            <h1 id="game-desc-title"
                                className="text-maincolor">
                                {this.props.title}
                            </h1>
                            <p
                                id="game-desc-dev"
                                className = "text-maincolor">
                                {this.props.dev}
                            </p>
                        </div>
                    </div>
                    <div
                        className="game-user-action-container">
                        <button
                            onClick={() => {
                                {order_show_jockey(this.props.title, this.props.art, this.props.dev)}
                            }}
                            id="game-order-button"
                            className="gamepage-button">
                            Show All Jockey
                        </button>
                        <button
                            onClick = {() => {
                                alert(this.props.title + ' has been added to your Wishlist')
                            }}
                            id="game-wishlist-button"
                            className="gamepage-button">
                            Add To Wishlist
                        </button>
                    </div>
                    <div
                        className="game-recommended-jockey">
                        <h1 
                            className="text-maincolor">
                            Recommended Jockey
                        </h1>
                        {jockey}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

root.render(<Home/>)