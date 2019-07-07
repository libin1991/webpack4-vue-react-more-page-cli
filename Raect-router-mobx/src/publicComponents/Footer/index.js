import React  from "react"
import './index.scss'
import { TabBar } from 'antd-mobile';
// import { Link } from 'react-router-dom'

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: false,
        }
    }
    render () {
        return (
            <div className="footer">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                    title="首页"
                    key="Life"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                    />
                    }
                    selected={this.props.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.props.History.push('/')
                    }}
                    data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                    icon={
                        <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    title="关于"
                    key="Koubei"
                    selected={this.props.selectedTab === 'redTab'}
                    onPress={() => {
                        this.props.History.push('/about')
                    }}
                    data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                    icon={
                        <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    title="个人中心"
                    key="Friend"
                    selected={this.props.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.props.History.push('/user')
                    }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}
export default Footer;