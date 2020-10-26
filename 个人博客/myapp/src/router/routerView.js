import React, { Component } from 'react'
import {Redirect,Route,Switch} from "react-router-dom"
export default class routerView extends Component {
    //路由表
    render() {
        let {routerList} = this.props;
        let list = routerList.filter(item=>item.path);
        let redirect = routerList.filter(item=>!item.path)[0]
        console.log(redirect)
        return (
            <div className="View" style={over}>
                <Switch>
                    {
                        list.map((item,index)=>{
                            return <Route path={item.path} key={index} render={(props)=>{
                                let Com = item.com;
                                if(item.children){
                                    return <Com {...props} children={item.children} navlink = {item.children.filter(item=>item.path)}></Com>
                                }else{
                                    return <Com {...props}></Com>
                                }
                            }}/>
                        })
                    }
                    {
                        redirect?<Redirect to={redirect.to} from={redirect.from}></Redirect>:<></>
                    }
                </Switch>
            </div>
        )
    }
}
