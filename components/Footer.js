export default function Footer() {
    return (
        <footer className="bg-black dark:bg-gray-800">
            <hr className="mb-10 dark:border-gray-500" />
            <div className="container px-6 pb-8 mx-auto">

                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-400">© Copyright 2021. All Rights Reserved.</p>

                <div className="flex mt-3 -mx-2 sm:mt-0">
                    <a href={`https://etherscan.io/address/`} target="_blank" rel="noopener" className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> 
                    Contract address: 0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd
                    </a>
                </div>
                </div>
            </div>
        </footer>
    )
}