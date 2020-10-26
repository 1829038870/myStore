import Home from "../pages/Home.js"
import List from "../pages/Home/List.js"
import Mymark from "../pages/Mymark.js"
import My from "../pages/My.js"
import Login from "../pages/Login"
import Zhuce from "../pages/Zhuce"
import Data from "../pages/Data"
import Homes from "../pages/Home/home"
import Outtxt from "../pages/Home/Outtxt.js"
import Dian from "../pages/mymark/dianza.js"
import Ping from "../pages/mymark/pinglun.js"
import Tamy from "../pages/taのhome.js"
let routerList = [
    {
        path:"/home",
        com:Home,
        children:[
            {
                path:"/home/homes",
                com:Homes,
                title:"首页"
            },
            {
                path:"/home/data",
                com:Data
            },
            {
                path:"/home/outtxt",
                com:Outtxt
            },
            {
                from:"/home",
                to:"/home/homes"
            },
            {
                path:"/home/list",
                com:List
            },
        ]
    },
    {
        path:"/mymark",
        com:Mymark,
        children:[
            {
                path:"/mymark/dianzan",
                com:Dian
            },
            {
                path:"/mymark/pinglun",
                com:Ping
            },
            {
                from:"/mymark",
                to:"/mymark/dianzan"
            }
        ]
    },
    {
        path:"/tamy",
        com:Tamy
    },
    {
        path:"/my",
        com:My
    },
    {
        from:"/",
        to:"/home"
    },
    {
        path:"/login",
        com:Login
    },
    {
        path:"/zhuce",
        com:Zhuce
    },
]

export default routerList