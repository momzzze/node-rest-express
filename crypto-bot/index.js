require("dotenv").config();
const {
    ethers
} = require("ethers");

const fs = require("fs");

const ABI = require("./abi/SwapBot.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

async function callSwap() {
    const amountIn = ethers.utils.parseUnits("0.1", 18); // Amount to swap
    const amountOutMin = ethers.utils.parseUnits("0.01", 18); // Minimum amount to receive
    const path = [
        ethers.utils.getAddress("0xd27d2cbe48dbfa5c78d08d335edf094cc2fad801"), // USDC
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6" // WETH (already checksummed)
    ];



    try {
        const tx = await contract.executeSwap(amountIn, amountOutMin, path);
        console.log("Swap executed! Tx:", tx.hash);
    } catch (err) {
        console.error("❌ Swap failed:", err.message);
    }
}

callSwap();