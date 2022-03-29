import { PublicKey } from "@dfinity/agent";
import { BinaryBlob, DerEncodedBlob } from "@dfinity/candid";
declare class Secp256k1PublicKey implements PublicKey {
    static fromRaw(rawKey: BinaryBlob): Secp256k1PublicKey;
    static fromDer(derKey: BinaryBlob | DerEncodedBlob): Secp256k1PublicKey;
    static from(key: PublicKey): Secp256k1PublicKey;
    private static RAW_KEY_LENGTH;
    private static DER_PREFIX;
    private static derEncode;
    private static derDecode;
    private readonly rawKey;
    private readonly derKey;
    private constructor();
    toDer(): DerEncodedBlob;
    toRaw(): BinaryBlob;
}
export default Secp256k1PublicKey;
