import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("6B19hHv2vj6RM11YBV5XzqbQDoH19VXkDacDDTtDGLzi");

const myMetadata = {
    name: "SuperteamNG Kano devs 2024",
    symbol: "SKDC",
    uri: "https://arweave.net/N71GOQa0D2BMHwEfgsLTQEJjpOazTM4NKaZHGk7rJhs",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}; 

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
)

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
    }, 
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: myMetadata,
            isMutable: true,
        }
    }
);

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection, transaction, [user]
); 

const transactionLink = getExplorerLink("transaction", transactionSignature, "devnet");

console.log("Transaction confirmed, explorer link is: ", transactionLink);

const tokenMint = getExplorerLink (
    "address",
    tokenMintAccount.toString(),
    "devnet"
)

console.log("Token mint confirmed, explorer link is: ", tokenMint);
