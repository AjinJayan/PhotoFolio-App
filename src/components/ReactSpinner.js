import Spinner from 'react-spinner-material';

export default function ReactSpinner() {
    return (
        <div className='realtive left-1/2 translate-x-2/4 mt-16'>
            <Spinner radius={50} color={"#333"} stroke={2} visible={true} />
        </div>
    );
}