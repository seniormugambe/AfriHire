// This is a MOCK service to simulate Hedera wallet interactions.
// In a real application, this would integrate with a wallet provider like HashPack.

/**
 * Simulates connecting to a user's Hedera wallet.
 * @returns A promise that resolves with the account ID and a random balance.
 */
export const connectWallet = async (): Promise<{ accountId: string; balance: number }> => {
  console.log("Connecting to Hedera wallet...");
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate connection delay
  const accountId = `0.0.${Math.floor(100000 + Math.random() * 900000)}`;
  const balance = Math.floor(500 + Math.random() * 10000); // Random HBAR balance
  console.log(`Connected to account: ${accountId} with balance: ${balance} hbar`);
  return { accountId, balance };
};

/**
 * Simulates executing a transaction on the Hedera network.
 * @param accountId The ID of the account sending the transaction.
 * @param amount The amount of HBAR to transfer.
 * @returns A promise that resolves with a unique transaction ID.
 */
export const executeTransaction = async (accountId: string, amount: number): Promise<string> => {
    console.log(`Executing transaction of ${amount} hbar from ${accountId}...`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay

    // Simulate a random success/failure for demonstration
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
        const transactionId = `${accountId}-${Date.now()}`;
        console.log("Transaction successful. ID:", transactionId);
        return transactionId;
    } else {
        console.error("Transaction failed.");
        throw new Error("Hedera transaction failed. Please try again.");
    }
};
