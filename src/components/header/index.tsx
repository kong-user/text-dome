import React from "react";
import { SettingOutlined } from '@ant-design/icons'
import { ScanOutlined } from '@ant-design/icons'
import './index.less'

const Header = () => {
    return (
        <div className="app-header">
            <div className="header-icon">
                <SettingOutlined className="icon" />
                <ScanOutlined className="icon" />
            </div>
        </div>
    )
}
export default Header