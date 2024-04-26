import { memo } from 'react';
import { Handle, Position, NodeResizeControl } from 'reactflow';
import {useDispatch, useSelector} from "react-redux";

const controlStyle = {
    background: 'transparent',
    border: 'none',
};

const CustomNode = ({ data }) => {
    const {user} = useSelector(state => state.user);


    return (
        <>
            {user.authType === 'rfid' && (
                <NodeResizeControl style={controlStyle} minWidth={20} minHeight={20}>
                    <ResizeIcon />
                </NodeResizeControl>
            )}

            {data.handlePosition.left && (
                <Handle id='a' type={data.handlePosition.left} position={Position.Left} />
            )}
            {data.handlePosition.top && (
                <Handle id='b' type={data.handlePosition.top} position={Position.Top} />
            )}
            <div className='bg-white font-bold rounded-md text-center relative'>
                {data.label}

            </div>
            {data.handlePosition.right && (
                <Handle id='c' type={data.handlePosition.right} position={Position.Right} />
            )}
            {data.handlePosition.bottom && (
                <Handle id='d' type={data.handlePosition.bottom} position={Position.Bottom} />
            )}
        </>
    );
};

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#ff0071"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}

export default memo(CustomNode);
