# **Hedera Whisper**

## **Overview**
Hedera Whisper is a decentralized platform designed to facilitate secure, encrypted transactions and messaging on the Hedera network. The application leverages Hedera's SDK for encryption and smart contracts, ensuring that only intended recipients can decrypt sensitive messages utilising on the Hedera Consensus Service (HCS). Key features include timelocked and code-based gifts, recurring transactions, and support for verified tokens and charities.

https://github.com/user-attachments/assets/0675a9ca-7432-49ea-8e94-de521e32e069

## **Features**
- **Encrypted Messaging:** Secure end-to-end encrypted messaging using the Hedera SDK and ECDSA secp256k1 encryption.
- **Timelocked Gifts:** Schedule gifts to be unlocked at a specific time, adding a layer of flexibility and security.
- **Code-Based Gifts:** Generate and claim gifts using unique codes, ensuring only the intended recipient can access them.
- **Recurring Transactions:** Automate periodic transactions for seamless transfers, ideal for regular payments or donations.
- **Charity Support:** Donate securely to verified charities, ensuring transparency and trust.
- **Verified Tokens:** Manage a list of verified tokens that can be used on the platform.


https://github.com/user-attachments/assets/59a7e3c7-fd0e-4a77-b60b-9c3b00e0afb1


## **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
   - [Deploying the Smart Contract](#deploying-the-smart-contract)
   - [Running the Encryption Script](#running-the-encryption-script)
   - [Interacting with the Contract](#interacting-with-the-contract)
5. [Security Considerations](#security-considerations)
6. [Roadmap](#roadmap)
7. [Contributing](#contributing)
8. [License](#license)

## **Prerequisites**
Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Solidity** (v0.8.9 or higher)
- **Hedera SDK** (JavaScript)
- **MetaMask** or another Ethereum-compatible wallet
- **Hedera Testnet Account** (for testing purposes)
  
## **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hedera-whisper.git
   cd hedera-whisper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Solidity Compiler:**
   If you don't have the Solidity compiler installed, you can use the following command:
   ```bash
   npm install -g solc
   ```

4. **Set Up Hedera SDK:**
   Ensure you have the Hedera SDK installed:
   ```bash
   npm install --save @hashgraph/sdk
   ```

## **Configuration**

1. **Set up environment variables:**
   Create a `.env` file in the root directory of the project and add the following variables:
   ```plaintext
   OPERATOR_ID=your-hedera-testnet-operator-id
   OPERATOR_KEY=your-hedera-testnet-operator-private-key
   HCS_TOPIC_ID=your-hedera-consensus-service-topic-id
   ACCOUNT_0_ID=account-id
   ACCOUNT_0_EVMADDRESS=evm-address
   ACCOUNT_0_KEY=private-key
   ACCOUNT_0_PUBLICKEY=public-key
   ```

2. **Modify Configuration for Multiple Accounts:**
   You can add up to 5 accounts by adding similar variables as shown above for `ACCOUNT_1`, `ACCOUNT_2`, etc.

## **Usage**

### **Deploying the Smart Contract**

1. **Compile the Smart Contract:**
   Compile the Solidity smart contract using the Solidity compiler:
   ```bash
   solc --optimize --bin --abi --overwrite -o ./build HederaWhisper.sol
   ```

2. **Deploy the Contract:**
   Use the Hedera SDK or your preferred Ethereum-compatible wallet (e.g., MetaMask) to deploy the compiled contract to the Hedera network. Record the contract address for future interactions.

### **Running the Encryption Script**

1. **Encrypting and Sending Messages:**
   Run the script to encrypt a message and send it to the HCS topic:
   ```bash
   node encrypting-and-sending-msg.js
   ```
   This will encrypt the message with the intended recipient's public key and submit it to the HCS topic.

2. **Reading and Decrypting Messages:**
   The recipient can read and decrypt the message from the HCS topic using their private key.

### **Interacting with the Contract**

1. **Add a Verified Token:**
   ```javascript
   await hederaWhisper.addVerifiedToken(tokenAddress);
   ```
   Add a token to the list of verified tokens that can be used within the platform.

2. **Create a Timelocked Gift:**
   ```javascript
   await hederaWhisper.createTimelockedGift(token, recipient, amount, unlockTime, message);
   ```
   Create a gift that can only be claimed after a specific time.

3. **Claim a Gift with a Code:**
   ```javascript
   await hederaWhisper.claimGiftWithCode(claimCode, tokenAddress);
   ```
   Claim a gift using a unique code.

4. **Set Up a Recurring Gift:**
   ```javascript
   await hederaWhisper.setupRecurringGift(token, recipient, amount, interval);
   ```
   Automate recurring transactions at specified intervals.

## **Security Considerations**

- **Private Key Management:** Always ensure that private keys are securely stored and never exposed in your code or publicly accessible files.
- **Encryption:** The encryption process uses ECDSA secp256k1, a robust elliptic curve encryption method, to secure messages. Only the intended recipient can decrypt messages.
- **Token Verification:** Only verified tokens can be used on the platform, reducing the risk of fraudulent or unsupported tokens.

## **Roadmap**

- **Integration with More Wallets:** Expand compatibility to include more Ethereum-compatible wallets.
- **Enhanced User Interface:** Develop a user-friendly interface for non-technical users.
- **Smart Contract Audits:** Conduct thorough audits to ensure the security and reliability of the platform.
- **Mobile App:** Create a mobile application to increase accessibility and usability.

## **Contributing**

We welcome contributions from the community! If you'd like to contribute to Hedera Whisper, please follow these steps:

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Commit your changes**: `git commit -m 'Add new feature'`
4. **Push to the branch**: `git push origin feature-branch`
5. **Submit a pull request**

## **License**

This project is licensed under the MIT License.

---

Feel free to customize the README further to suit your project's specific needs or to add any additional sections that might be relevant.