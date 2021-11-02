export default function ProgressBar(props) {
    let { percent = 0 } = props;
    return (
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                <div style={{width:`${percent}%`}}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500">
                </div>
            </div>
        </div>
    )
}