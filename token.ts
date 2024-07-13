// token mint
import { createMint } from "@solana/spl-token";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Connection established and my user public key is: ", user.publicKey.toBase58());

const tokenMint = await createMint(connection, user, user.publicKey, user.publicKey, 2);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log("Token mint is created and the link is: ", link);

// token metadata




// creating a token account
// mint
// transfering tokens
// burning token