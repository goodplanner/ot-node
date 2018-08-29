pragma solidity ^0.4.23;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
    * @dev The Ownable constructor sets the original `owner` of the contract to the sender
    * account.
    */
    constructor () public {
        owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}

contract ContractHub is Ownable{
    address public fingerprintAddress;
    address public tokenAddress;
    address public profileAddress;
    address public biddingAddress;
    address public escrowAddress;
    address public litigationAddress;
    address public readingAddress;

    address public profileStorageAddress;
    address public biddingStorageAddress;
    address public escrowStorageAddress;
    address public litigationStorageAddress;
    address public readingStorageAddress;

    event ContractsChanged();

    function setFingerprintAddress(address newFingerprintAddress)
    public onlyOwner {
        fingerprintAddress = newFingerprintAddress;
        emit ContractsChanged();
    }

    function setTokenAddress(address newTokenAddress)
    public onlyOwner {
        tokenAddress = newTokenAddress;
        emit ContractsChanged();
    }

    function setProfileAddress(address newProfileAddress)
    public onlyOwner {
        profileAddress = newProfileAddress;
        emit ContractsChanged();
    }

    function setBiddingAddress(address newBiddingAddress)
    public onlyOwner {
        biddingAddress = newBiddingAddress;
        emit ContractsChanged();
    }

    function setEscrowAddress(address newEscrowAddress)
    public onlyOwner {
        escrowAddress = newEscrowAddress;
        emit ContractsChanged();
    }

    function setLitigationAddress(address newLitigationAddress)
    public onlyOwner {
        litigationAddress = newLitigationAddress;
        emit ContractsChanged();
    }

    function setReadingAddress(address newReadingAddress)
    public onlyOwner {
        readingAddress = newReadingAddress;
        emit ContractsChanged();
    }

    function setProfileStorageAddress(address newpPofileStorageAddress)
    public onlyOwner {
        profileStorageAddress = newpPofileStorageAddress;
    }

    function setBiddingStorageAddress(address newBiddingStorageAddress)
    public onlyOwner {
        biddingStorageAddress = newBiddingStorageAddress;
    }

    function setEscrowStorageAddress(address newEscrowStorageAddress)
    public onlyOwner {
        escrowStorageAddress = newEscrowStorageAddress;
    }

    function setLitigationStorageAddress(address newLitigationStorageAddress)
    public onlyOwner {
        litigationStorageAddress = newLitigationStorageAddress;
    }
    
    function setReadingStorageAddress(address newReadingStorageAddress)
    public onlyOwner {
        readingStorageAddress = newReadingStorageAddress;
    }

}