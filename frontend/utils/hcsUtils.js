// hcsUtils.js
import crypto from 'node:crypto';
import standardEcies from 'standard-ecies';
import {
    Client,
    AccountId,
    PrivateKey,
    PublicKey,
    TopicMessageSubmitTransaction,
} from '@hashgraph/sdk';

const eciesOptions = {
    curveName: 'secp256k1',
};

const getClient = () => {
    const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_OPERATOR_ID);
    const operatorKey = PrivateKey.fromStringED25519(process.env.NEXT_PUBLIC_OPERATOR_KEY);
    return Client.forTestnet().setOperator(operatorId, operatorKey);
};

export async function encryptMessage(message, publicKey) {
    const messageBuffer = Buffer.from(message, 'utf8');
    return standardEcies.encrypt(publicKey, messageBuffer, eciesOptions);
}

export async function decryptMessage(encryptedMessage, privateKey) {
    return standardEcies.decrypt(privateKey, encryptedMessage, eciesOptions).toString('utf8');
}

export async function submitEncryptedMessage(topicId, encryptedMessage, senderId, receiverId) {
    const client = getClient();
    const messageObject = {
        from: senderId,
        to: receiverId,
        msg: encryptedMessage.toString('base64url'),
    };
    const messageJson = JSON.stringify(messageObject);

    const transaction = await new TopicMessageSubmitTransaction({
        topicId,
        message: messageJson,
    }).execute(client);

    const receipt = await transaction.getReceipt(client);
    await client.close();
    return receipt.topicSequenceNumber;
}
