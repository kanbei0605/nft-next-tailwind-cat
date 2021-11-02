export default function FAQ() {
    return (
        <section id="faq" className="container px-6 py-8 mx-auto">
            <hr />
            <div className="max-w-screen-lg mx-auto mt-6">
                <h1 className="font-namunbrush text-3xl mb-2">What is 10KTF?</h1>
                <p className="mb-1">World renowned craftsman Wagmi-san, famous for the most grailed accessories, recently set up a shop in New Tokyo called 10KTF.</p>
                <p className="mb-1">Depending on the day, Wagmi-san might create accessories for Apes, Cats, Robots, Loots… it’s really up to whatever he’s in the mood for. A man of honor, he only makes objects for customers who own parent NFTs. His accessories are 1 of 1 digital objects that will only be created once.</p>
                <p className="mb-3">Life is good. But he’s still required to pay for protection to keep his shop open. It’s better than the alternative. After what happened last summer, he can’t let that happen again.</p>
                <h1 className="font-namunbrush text-3xl mb-2">Who can create/mint items on 10KTF?</h1>
                <p className="mb-3">Each item available on 10KTF requires that the user owns the corresponding parent NFT in order to create. For example, for Ape High Tops, only owners of a Bored Ape can create and mint an Ape High Top. Moreover, only one Ape High Top can be minted for each Bored Ape so there can be at most 10,000 Ape High Tops created, one for each corresponding Bored Ape.</p>
                <h1 className="font-namunbrush text-3xl mb-2">What items can I create/mint on 10KTF?</h1>
                <p className="mb-3">For our inaugural collection, Wagmi-san has crafted High Top shoes for Apes, Non-serum Mutants (Token Ids {'<'} 10,000), Kennels, Cats, Penguins, Women, and 0N1 holders. Stay tuned for what Wagmi-san might create next!</p>
                <h1 className="font-namunbrush text-3xl mb-2">How much will it cost to mint a new item?</h1>
                <p className="mb-3">You can download the PNG for free, or Mint the item on Ethereum for 0.05 ETH + Gas fees.</p>
                <h1 className="font-namunbrush text-3xl mb-2">How does 10KTF work?</h1>
                <p className="mb-3">10KTF utilizes a purpose-built ERC 721 compatible smart contract to enable users to directly mint derivative NFTs from their existing NFTs. Our smart contract ensures that only the current owner of the NFT is able to create the derivative NFT and that only one NFT is minted for each corresponding parent NFT.</p>
                <h1 className="font-namunbrush text-3xl mb-2">How unique will items be?</h1>
                <p className="mb-3">Each 10KTF item is unique (1 of 1) and corresponds one-to-one with the parent project NFT. So for a 10k project, there will only be at most 10,000 variations of the item and only one of each variation available.</p>
                <h1 className="font-namunbrush text-3xl mb-2">Will there be a physical item?</h1>
                <p className="mb-3">Currently 10KTF items are purely digital. Stay tuned for more updates from Wagmi-san.</p>
                <h1 className="font-namunbrush text-3xl mb-2">Can you make items for XYZ NFT project?</h1>
                <p className="mb-3">Yes! Send us your suggestions. However, please note that 10KTF items can only be created for NFT projects that grant commercial rights to their owners.</p>
                <h1 className="font-namunbrush text-3xl mb-2">What wallets does 10KTF support?</h1>
                <p className="mb-3">Currently our site only supports Metamask. In order to use 10KTF please load the wallet that contains your NFTs into Metamask.</p>
                <h1 className="font-namunbrush text-3xl mb-2">I'm having trouble minting with a Ledger hardware wallet, what can I do?</h1>
                <p className="mb-3">If you are having trouble you can try the following steps:</p>
                <ol>
                    <li className="ml-3">
                        1. Update Ledger Live, Ledger Device Firmware, and the Ledger Ethereum app to most recent version.
                    </li>
                    <li className="ml-3">
                        2. Turn on Contract Data and start the Ethereum app on your Ledger device.
                    </li>
                    <li className="ml-3">
                        <ol>
                            <li className="ml-3">1. Select "Settings"</li>
                            <li className="ml-3">2. Select "Allowed" on Contract Data</li>
                        </ol>
                    </li>
                    <li className="ml-3">
                        3. Make sure Ledger Live application is active and Device Bridge is Open
                    </li>
                    <li className="ml-3">
                        4. Try both Chrome and Brave. Sometimes one works and the other doesn’t.
                    </li>
                    <li className="ml-3">
                        5. Try disabling/uninstalling Metamask plugin in the browser and then re-enabling/installing Metamask.
                    </li>
                    <li className="ml-3">
                        6. If you are being quoted an extraordinarily high gas fee in MetaMask, you will need more ETH in your wallet to get a proper quote.
                    </li>
                </ol>
            </div>
        </section>
    )
}