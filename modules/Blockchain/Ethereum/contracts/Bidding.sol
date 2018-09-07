pragma solidity ^0.4.23;

library MyMath {
	function muls(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a * b;
		assert(a == 0 || c / a == b);
		return c;
	}

	function divs(uint256 a, uint256 b) internal pure returns (uint256) {
		// assert(b > 0); // Solidity automatically throws when dividing by 0
		uint256 c = a / b;
		// assert(a == b * c + a % b); // There is no case in which this doesn't hold
		return c;
	}

	function subs(uint256 a, uint256 b) internal pure returns (uint256) {
		assert(b <= a);
		return a - b;
	}

	function adds(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a + b;
		assert(c >= a);
		return c;
	}

	function logs2(uint x) internal pure returns (uint y){
		require(x > 0);
		assembly {
			let arg := x
			x := sub(x,1)
			x := or(x, div(x, 0x02))
			x := or(x, div(x, 0x04))
			x := or(x, div(x, 0x10))
			x := or(x, div(x, 0x100))
			x := or(x, div(x, 0x10000))
			x := or(x, div(x, 0x100000000))
			x := or(x, div(x, 0x10000000000000000))
			x := or(x, div(x, 0x100000000000000000000000000000000))
			x := add(x, 1)
			let m := mload(0x40)
			mstore(m,           0xf8f9cbfae6cc78fbefe7cdc3a1793dfcf4f0e8bbd8cec470b6a28a7a5a3e1efd)
			mstore(add(m,0x20), 0xf5ecf1b3e9debc68e1d9cfabc5997135bfb7a7a3938b7b606b5b4b3f2f1f0ffe)
			mstore(add(m,0x40), 0xf6e4ed9ff2d6b458eadcdf97bd91692de2d4da8fd2d0ac50c6ae9a8272523616)
			mstore(add(m,0x60), 0xc8c0b887b0a8a4489c948c7f847c6125746c645c544c444038302820181008ff)
			mstore(add(m,0x80), 0xf7cae577eec2a03cf3bad76fb589591debb2dd67e0aa9834bea6925f6a4a2e0e)
			mstore(add(m,0xa0), 0xe39ed557db96902cd38ed14fad815115c786af479b7e83247363534337271707)
			mstore(add(m,0xc0), 0xc976c13bb96e881cb166a933a55e490d9d56952b8d4e801485467d2362422606)
			mstore(add(m,0xe0), 0x753a6d1b65325d0c552a4d1345224105391a310b29122104190a110309020100)
			mstore(0x40, add(m, 0x100))
			let magic := 0x818283848586878898a8b8c8d8e8f929395969799a9b9d9e9faaeb6bedeeff
			let shift := 0x100000000000000000000000000000000000000000000000000000000000000
			let a := div(mul(x, magic), shift)
			y := div(mload(add(m,sub(255,a))), shift)
			y := add(y, mul(256, gt(arg, 0x8000000000000000000000000000000000000000000000000000000000000000)))
		}
	}

	function absoluteDifference(uint256 a, uint256 b) internal pure returns (uint256) {
		if (a > b) return a-b;
		else return b-a;
	}

}

contract EscrowHolder {
	function initiateEscrow(address DC_wallet, address DH_wallet, bytes32 import_id, uint token_amount, uint stake_amount, uint total_time_in_minutes, uint litigation_interval_in_minutes) public;
}

contract ContractHub{
	address public escrowAddress;

	address public profileStorageAddress;
	address public biddingStorageAddress;
}

contract ProfileStorage {

	function getProfile_token_amount_per_byte_minute(address wallet) public view returns(uint);
	function getProfile_stake_amount_per_byte_minute(address wallet) public view returns(uint);
	function getProfile_balance(address wallet) public view returns(uint);
	function getProfile_reputation(address wallet) public view returns(uint);
	function getProfile_number_of_escrows(address wallet) public view returns(uint);
	function getProfile_max_escrow_time_in_minutes(address wallet) public view returns(uint);

	function setProfile_balance(address wallet, uint256 balance) public;
}

contract BiddingStorage {
	enum OfferStatus {inactive, active, cancelled, finalized}

	function getOffer_DC_wallet(bytes32 import_id) public view returns(address);
	function getOffer_max_token_amount_per_DH(bytes32 import_id) public view returns(uint);
	function getOffer_min_stake_amount_per_DH(bytes32 import_id) public view returns(uint);
	function getOffer_min_reputation(bytes32 import_id) public view returns(uint);
	function getOffer_total_escrow_time_in_minutes(bytes32 import_id) public view returns(uint);
	function getOffer_data_size_in_bytes(bytes32 import_id) public view returns(uint);
	function getOffer_litigation_interval_in_minutes(bytes32 import_id) public view returns(uint);
	function getOffer_data_hash(bytes32 import_id) public view returns(bytes32);
	function getOffer_first_bid_index(bytes32 import_id) public view returns(uint);
	function getOffer_bid_array_length(bytes32 import_id) public view returns(uint);
	function getOffer_replication_factor(bytes32 import_id) public view returns(uint);
	function getOffer_replication_modifier(bytes32 import_id) public view returns(uint);
	function getOffer_offer_creation_timestamp(bytes32 import_id) public view returns(uint);
	function getOffer_status(bytes32 import_id) public view returns(OfferStatus);

	function setOffer_DC_wallet(bytes32 import_id, address DC_wallet) public;
	function setOffer_max_token_amount_per_DH(bytes32 import_id, uint max_token_amount_per_DH) public;
	function setOffer_min_stake_amount_per_DH(bytes32 import_id, uint min_stake_amount_per_DH) public;
	function setOffer_min_reputation(bytes32 import_id, uint min_reputation) public;
	function setOffer_total_escrow_time_in_minutes(bytes32 import_id, uint total_escrow_time_in_minutes) public;
	function setOffer_data_size_in_bytes(bytes32 import_id, uint data_size_in_bytes) public;
	function setOffer_litigation_interval_in_minutes(bytes32 import_id, uint litigation_interval_in_minutes) public;
	function setOffer_data_hash(bytes32 import_id, bytes32 data_hash) public;
	function setOffer_first_bid_index(bytes32 import_id, uint first_bid_index) public;
	function setOffer_bid_array_length(bytes32 import_id, uint bid_array_length) public;
	function setOffer_replication_factor(bytes32 import_id, uint replication_factor) public;
	function setOffer_replication_modifier(bytes32 import_id, uint replication_modifier) public;
	function setOffer_offer_creation_timestamp(bytes32 import_id, uint offer_creation_timestamp) public;
	function setOffer_status(bytes32 import_id, OfferStatus status) public;

	function getBid_DH_wallet(bytes32 import_id, uint bid_index) public view returns (address);
	function getBid_DH_node_id(bytes32 import_id, uint bid_index) public view returns (bytes32);
	function getBid_token_amount_for_escrow(bytes32 import_id, uint bid_index) public view returns (uint);
	function getBid_stake_amount_for_escrow(bytes32 import_id, uint bid_index) public view returns (uint);
	function getBid_ranking(bytes32 import_id, uint bid_index) public view returns (uint);
	function getBid_next_bid_index(bytes32 import_id, uint bid_index) public view returns (uint);
	function getBid_active(bytes32 import_id, uint bid_index) public view returns (bool);
	function getBid_chosen(bytes32 import_id, uint bid_index) public view returns (bool);
	
	function setBid(
		bytes32 import_id, uint256 bid_index,
		address DH_wallet, bytes32 DH_node_id,
		uint token_amount_for_escrow, uint stake_amount_for_escrow,
		uint256 ranking, uint next_bid, bool active, bool chosen)
	public;

	function setBid_next_bid_index(bytes32 import_id, uint index, uint next_bid_index) public;
	function setBid_active(bytes32 import_id, uint index, bool active) public;
	function setBid_chosen(bytes32 import_id, uint index, bool chosen) public;
}

contract Bidding {
	using MyMath for uint256;

	ContractHub public hub;

	ProfileStorage public profileStorage;
	BiddingStorage public biddingStorage;
	uint256 replication_modifier;

	constructor(address hub_address)
	public{
		require (hub_address != address(0));
		hub = ContractHub(hub_address);
	}

	function initiate() public {
		profileStorage = ProfileStorage(hub.profileStorageAddress());
		biddingStorage = BiddingStorage(hub.biddingStorageAddress());
		replication_modifier = 1;
	}

	/*    ----------------------------- EVENTS -----------------------------     */


	event OfferCreated(bytes32 import_id, bytes32 DC_node_id, 
		uint total_escrow_time_in_minutes, uint max_token_amount_per_DH, uint min_stake_amount_per_DH, uint min_reputation, 
		uint data_size_in_bytes, bytes32 data_hash, uint litigation_interval_in_minutes);
	event OfferCanceled(bytes32 import_id);
	event AddedBid(bytes32 import_id, address DH_wallet, bytes32 DH_node_id, uint bid_index);
	event AddedPredeterminedBid(bytes32 import_id, address DH_wallet, bytes32 DH_node_id, uint bid_index, 
		uint total_escrow_time_in_minutes, uint max_token_amount_per_DH, uint min_stake_amount_per_DH,
		uint data_size_in_bytes, uint litigation_interval_in_minutes);
	event FinalizeOfferReady(bytes32 import_id);
	event BidTaken(bytes32 import_id, address DH_wallet);
	event OfferFinalized(bytes32 import_id);

	/*    ----------------------------- OFFERS -----------------------------     */

	function createOffer(
		bytes32 import_id,
		bytes32 DC_node_id,

		uint total_escrow_time_in_minutes, 
		uint max_token_amount_per_DH,
		uint min_stake_amount_per_DH,
		uint min_reputation,

		bytes32 data_hash,
		uint data_size_in_bytes,
		uint litigation_interval_in_minutes,

		address[] predetermined_DH_wallet,
		bytes32[] predetermined_DH_node_id)
	public {
		require(biddingStorage.getOffer_status(import_id) != BiddingStorage.OfferStatus.active);
		require(max_token_amount_per_DH > 0 && total_escrow_time_in_minutes > 0 && data_size_in_bytes > 0);


		uint DC_balance = profileStorage.getProfile_balance(msg.sender);
		require(DC_balance >= max_token_amount_per_DH.muls(predetermined_DH_wallet.length.muls(2).adds(replication_modifier)));
		
		DC_balance = DC_balance.subs(max_token_amount_per_DH.muls(predetermined_DH_wallet.length.muls(2).adds(replication_modifier)));
		profileStorage.setProfile_balance(msg.sender, DC_balance);

		//Writing the predetermined DC into the bid list
		for(uint256 i = 0; i < predetermined_DH_wallet.length; i = i + 1) {
			biddingStorage.setBid(import_id, i, predetermined_DH_wallet[i], predetermined_DH_node_id[i], 0, 0, 0, 0, false, false);

			emit AddedPredeterminedBid(import_id, predetermined_DH_wallet[i], predetermined_DH_node_id[i], i, 
				total_escrow_time_in_minutes, max_token_amount_per_DH, min_stake_amount_per_DH, 
				data_size_in_bytes, litigation_interval_in_minutes);
		}
		biddingStorage.setOffer_DC_wallet(import_id, msg.sender);
		biddingStorage.setOffer_max_token_amount_per_DH(import_id, max_token_amount_per_DH);
		biddingStorage.setOffer_min_stake_amount_per_DH(import_id, min_stake_amount_per_DH);
		biddingStorage.setOffer_min_reputation(import_id, min_reputation);
		biddingStorage.setOffer_total_escrow_time_in_minutes(import_id, total_escrow_time_in_minutes);
		biddingStorage.setOffer_data_size_in_bytes(import_id, data_size_in_bytes);
		biddingStorage.setOffer_litigation_interval_in_minutes(import_id, litigation_interval_in_minutes);
		biddingStorage.setOffer_data_hash(import_id, data_hash);
		biddingStorage.setOffer_first_bid_index(import_id, uint(-1));
		biddingStorage.setOffer_bid_array_length(import_id, predetermined_DH_wallet.length);
		biddingStorage.setOffer_replication_factor(import_id, predetermined_DH_wallet.length);
		biddingStorage.setOffer_replication_modifier(import_id, replication_modifier);
		biddingStorage.setOffer_offer_creation_timestamp(import_id, block.timestamp);
		biddingStorage.setOffer_status(import_id, BiddingStorage.OfferStatus.active);

		emit OfferCreated(import_id, DC_node_id, total_escrow_time_in_minutes, 
			max_token_amount_per_DH, min_stake_amount_per_DH, min_reputation,
			data_size_in_bytes, data_hash, litigation_interval_in_minutes);
	}

	function cancelOffer(bytes32 import_id)
	public{
		
		require(biddingStorage.getOffer_status(import_id) == BiddingStorage.OfferStatus.active, "Offer not active!");
		require(biddingStorage.getOffer_DC_wallet(import_id) == msg.sender, "Sender not offer creator!");

		uint max_token_amount_per_DH = biddingStorage.getOffer_max_token_amount_per_DH(import_id);
		uint replication_factor = biddingStorage.getOffer_replication_factor(import_id);
		uint this_replication_modifier = biddingStorage.getOffer_replication_modifier(import_id);
		// Returns the alloted token amount back to DC
		uint max_total_token_amount = max_token_amount_per_DH.muls(replication_factor.muls(2).adds(this_replication_modifier));
		uint256 DC_balance = profileStorage.getProfile_balance(msg.sender);
		DC_balance = DC_balance.adds(max_total_token_amount);
		profileStorage.setProfile_balance(msg.sender, DC_balance);

		biddingStorage.setOffer_status(import_id, BiddingStorage.OfferStatus.cancelled);
		emit OfferCanceled(import_id);
	}

	function activatePredeterminedBid(bytes32 import_id, bytes32 DH_node_id, uint bid_index)
	public{
		require(biddingStorage.getBid_DH_wallet(import_id, bid_index) == msg.sender && biddingStorage.getBid_DH_node_id(import_id, bid_index) == DH_node_id);

		require(bidRequirements(import_id, msg.sender));

		//Check if the the DH meets the filters DC set for the offer
		uint scope = biddingStorage.getOffer_total_escrow_time_in_minutes(import_id) * biddingStorage.getOffer_data_size_in_bytes(import_id);
		uint token_amount_for_escrow = profileStorage.getProfile_token_amount_per_byte_minute(msg.sender).muls(scope);
		uint stake_amount_for_escrow = profileStorage.getProfile_stake_amount_per_byte_minute(msg.sender).muls(scope);

		//Write the required data for the bid
		biddingStorage.setBid(import_id, bid_index, msg.sender, DH_node_id, 
			token_amount_for_escrow, stake_amount_for_escrow,
			0, 0, true, false);
	}

	function bidRequirements(bytes32 import_id, address wallet) internal view returns(bool passed_requirements) {
		require(biddingStorage.getOffer_status(import_id) == BiddingStorage.OfferStatus.active, "Offer not active!");

		uint max_token_amount_per_DH = biddingStorage.getOffer_max_token_amount_per_DH(import_id);
		uint min_stake_amount_per_DH = biddingStorage.getOffer_min_stake_amount_per_DH(import_id);
		uint total_escrow_time_in_minutes = biddingStorage.getOffer_total_escrow_time_in_minutes(import_id);
		uint data_size_in_bytes = biddingStorage.getOffer_data_size_in_bytes(import_id);

		uint token_amount_per_byte_minute = profileStorage.getProfile_token_amount_per_byte_minute(wallet);
		uint stake_amount_per_byte_minute = profileStorage.getProfile_stake_amount_per_byte_minute(wallet);
		uint balance = profileStorage.getProfile_balance(wallet);
		uint max_escrow_time_in_minutes = profileStorage.getProfile_max_escrow_time_in_minutes(wallet);

		//Check if the the DH meets the filters DC set for the offer
		uint scope = data_size_in_bytes.muls(total_escrow_time_in_minutes);
		if(total_escrow_time_in_minutes > max_escrow_time_in_minutes) return false;
		if(max_token_amount_per_DH  < token_amount_per_byte_minute * scope) return false;
		if(min_stake_amount_per_DH  > stake_amount_per_byte_minute * scope) return false;
		if(stake_amount_per_byte_minute * scope > balance) return false;
		return true;
	}

	function addBid(bytes32 import_id, bytes32 DH_node_id)
	public {
		//Check if the the DH meets the filters DC set for the offer
		require(bidRequirements(import_id, msg.sender), "Sender does not meet the offer requirements");
		require(biddingStorage.getOffer_min_reputation(import_id) <= profileStorage.getProfile_reputation(msg.sender), "DH reputation too low");

		uint256 scope = biddingStorage.getOffer_data_size_in_bytes(import_id) * biddingStorage.getOffer_total_escrow_time_in_minutes(import_id);
		uint256 token_amount_for_escrow = profileStorage.getProfile_token_amount_per_byte_minute(msg.sender).muls(scope);
		uint256 stake_amount_for_escrow = profileStorage.getProfile_stake_amount_per_byte_minute(msg.sender).muls(scope);

		uint this_bid_index = biddingStorage.getOffer_bid_array_length(import_id);
		
		uint256 ranking = calculateRanking(import_id, msg.sender, scope);

		//Insert the bid in the proper place in the list
		if(biddingStorage.getOffer_first_bid_index(import_id) == uint(-1)){
			biddingStorage.setOffer_first_bid_index(import_id, this_bid_index);
			biddingStorage.setBid(import_id, this_bid_index, msg.sender, DH_node_id, 
				token_amount_for_escrow, stake_amount_for_escrow,
				ranking, uint(-1), true, false);
		}
		else{

			uint256 current_index = biddingStorage.getOffer_first_bid_index(import_id);
			uint256 previous_index = uint(-1);
			uint256 current_index_ranking = biddingStorage.getBid_ranking(import_id, current_index);
			uint current_index_next_bid = biddingStorage.getBid_next_bid_index(import_id, current_index);
			
			if(current_index_ranking < ranking){
				biddingStorage.setOffer_first_bid_index(import_id, this_bid_index);
				biddingStorage.setBid(import_id, this_bid_index, msg.sender, DH_node_id, 
					token_amount_for_escrow, stake_amount_for_escrow,
					ranking, current_index, true, false);
			}
			else {
				while(current_index != uint(-1) && current_index_ranking >= ranking){
					previous_index = current_index;
					current_index = current_index_next_bid;
					current_index_ranking = biddingStorage.getBid_ranking(import_id, current_index);
					current_index_next_bid = biddingStorage.getBid_next_bid_index(import_id, current_index);
				}
				if(current_index == uint(-1)){
					// Set the bid[previous_bid_index].next_bid to this_bid_index
					biddingStorage.setBid_next_bid_index(import_id, previous_index, this_bid_index);
					// Add new bid to storage
					biddingStorage.setBid(import_id, this_bid_index, msg.sender, DH_node_id, 
						token_amount_for_escrow, stake_amount_for_escrow,
						ranking, uint(-1), true, false);
				}
				else{
					// Set the bid[previous_bid_index].next_bid to this_bid_index
					biddingStorage.setBid_next_bid_index(import_id, previous_index, this_bid_index);
					// Add new bid to storage
					biddingStorage.setBid(import_id, this_bid_index, msg.sender, DH_node_id, 
						token_amount_for_escrow, stake_amount_for_escrow,
						ranking, current_index, true, false);
				}
			}

		}

		// Update offer
		biddingStorage.setOffer_bid_array_length(import_id, this_bid_index + 1);
		uint replication_factor = biddingStorage.getOffer_replication_factor(import_id);
		if(this_bid_index + 1 >= replication_factor.muls(3).adds(biddingStorage.getOffer_replication_modifier(import_id))) emit FinalizeOfferReady(import_id);

		emit AddedBid(import_id, msg.sender, DH_node_id, this_bid_index);
	}

	function cancelBid(bytes32 import_id, uint bid_index)
	public{
		require(biddingStorage.getBid_DH_wallet(import_id, bid_index) == msg.sender);
		biddingStorage.setBid_active(import_id, bid_index, false);
	}

	event Broj(uint256 broj);

	function chooseBids(bytes32 import_id) public returns (uint256[] chosen_data_holders){

		uint256[] memory parameters = new uint256[](10);
		require(biddingStorage.getOffer_status(import_id) == BiddingStorage.OfferStatus.active, "Offer not active!");
		parameters[0] = biddingStorage.getOffer_replication_factor(import_id); // replication_factor
		parameters[9] = biddingStorage.getOffer_replication_modifier(import_id);  // replication_modifier

		require(parameters[0].muls(3).adds(parameters[9]) <= biddingStorage.getOffer_bid_array_length(import_id), "Not enough bids to finalize offer");
		require(biddingStorage.getOffer_offer_creation_timestamp(import_id) + 1 seconds < block.timestamp, "Trying to finalize offer too soon"); // TODO Vrati ovo na minute
		
		parameters[1] = 0; // uint256 bid_index;
		parameters[2] = 0; // uint256 current_index;

		parameters[3] = 0; // uint256 token_amount_sent = 0;
		parameters[4] = biddingStorage.getOffer_max_token_amount_per_DH(import_id).muls(parameters[0].muls(2).adds(parameters[9])); 
		// uint256 max_total_token_amount = biddingStorage.getOffer_max_token_amount_per_DH(import_id).muls(parameters[0].muls(2).adds(1));

		parameters[5] = 0; // token_amount_for_escrow
		parameters[6] = 0; // stake_amount_for_escrow
		parameters[7] = biddingStorage.getOffer_total_escrow_time_in_minutes(import_id); // total_escrow_time_in_minutes
		parameters[8] = biddingStorage.getOffer_litigation_interval_in_minutes(import_id); // litigation_interval_in_minutes
		EscrowHolder escrow = EscrowHolder(hub.escrowAddress());
		
		chosen_data_holders = new uint256[](parameters[0].muls(2).adds(parameters[9]));

		//Sending escrow requests to predetermined bids
		for(parameters[1] = 0; parameters[1] < parameters[0]; parameters[1] = parameters[1] + 1){

			if(profileStorage.getProfile_balance(biddingStorage.getBid_DH_wallet(import_id, parameters[1])) >= biddingStorage.getBid_stake_amount_for_escrow(import_id, parameters[1]) 
				&& biddingStorage.getBid_active(import_id, parameters[1])){
				//Initiating new escrow
				parameters[5] = biddingStorage.getBid_token_amount_for_escrow(import_id, parameters[1]);
				parameters[6] = biddingStorage.getBid_stake_amount_for_escrow(import_id, parameters[1]);
				escrow.initiateEscrow(msg.sender, biddingStorage.getBid_DH_wallet(import_id, parameters[1]), import_id, 
					parameters[5], parameters[6], parameters[7], parameters[8]);

				parameters[3] = parameters[3].adds(parameters[5]);

				biddingStorage.setBid_chosen(import_id, parameters[1], true);
				chosen_data_holders[parameters[2]] = parameters[1];
				parameters[2] = parameters[2] + 1;

				emit BidTaken(import_id, biddingStorage.getBid_DH_wallet(import_id, parameters[1]));
			}
		}

		//Sending escrow requests to network bids
		parameters[1] = biddingStorage.getOffer_first_bid_index(import_id);
		while(parameters[2] < parameters[0].muls(2).adds(parameters[9])) {
			uint256 next_bid = biddingStorage.getBid_next_bid_index(import_id, parameters[1]);

			while(parameters[1] != uint(-1) && !biddingStorage.getBid_active(import_id, parameters[1])){
				parameters[1] = next_bid;
				next_bid = biddingStorage.getBid_next_bid_index(import_id, parameters[1]);
			} 

			if(parameters[1] == uint(-1)) break;

			if(profileStorage.getProfile_balance(biddingStorage.getBid_DH_wallet(import_id, parameters[1])) >= biddingStorage.getBid_stake_amount_for_escrow(import_id, parameters[1])){
				//Initiating new escrow
				parameters[5] = biddingStorage.getBid_token_amount_for_escrow(import_id, parameters[1]);
				parameters[6] = biddingStorage.getBid_stake_amount_for_escrow(import_id, parameters[1]);

				escrow.initiateEscrow(msg.sender, biddingStorage.getBid_DH_wallet(import_id, parameters[1]), import_id, 
					parameters[5], parameters[6], parameters[7], parameters[8]);

				parameters[3] = parameters[3].adds(parameters[5]);

				// Set bid to chosen
				biddingStorage.setBid_chosen(import_id, parameters[1], true);

				chosen_data_holders[parameters[2]] = parameters[1];
				parameters[2] = parameters[2] + 1;
				parameters[1] = next_bid;

				emit BidTaken(import_id, biddingStorage.getBid_DH_wallet(import_id, parameters[1]));
			}
			else {
				// Set bid to inactive
				biddingStorage.setBid_active(import_id, parameters[1], false);
			}

		}

		// Update offer (set status to finalized)
		biddingStorage.setOffer_status(import_id, BiddingStorage.OfferStatus.finalized);

		// Return the unused tokens back to DC
		uint DC_balance = profileStorage.getProfile_balance(msg.sender);
		DC_balance = DC_balance.adds(parameters[4].subs(parameters[3]));
		profileStorage.setProfile_balance(msg.sender, DC_balance);
		
		emit OfferFinalized(import_id); 
	}
	
	/* corrective_factor = 10^10;
	DH_stake = 10^20
	min_stake_amount_per_DH = 10^18
	data_hash = 1234567890
	DH_node_id = 123456789011
	max_token_amount_per_DH = 100000000
	token_amount = 10000
	min_reputation = 10
	reputation = 60
	hash_difference = abs(data_hash - DH_node_id)
	hash_f = (data_hash * (2^128)) / (hash_difference + data_hash)
	price_f = corrective_factor - ((corrective_factor * token_amount) / max_token_amount_per_DH)
	stake_f = (corrective_factor - ((min_stake_amount_per_DH * corrective_factor) / DH_stake)) * data_hash / (hash_difference + data_hash)
	rep_f = (corrective_factor - (min_reputation * corrective_factor / reputation))
	distance = ((hash_f * (corrective_factor + price_f + stake_`f + rep_f)) / 4) / corrective_factor */ 

	// Constant values used for distance calculation
	uint256 corrective_factor = 10**10;

	function calculateRanking(bytes32 import_id, address DH_wallet, uint256 scope)
	public view returns (uint256 ranking) {
		uint256 data_hash = uint256(uint128(biddingStorage.getOffer_data_hash(import_id)));
		
		uint256[] memory amounts = new uint[](5);
		amounts[0] = profileStorage.getProfile_token_amount_per_byte_minute(DH_wallet).muls(scope);
		amounts[1] = profileStorage.getProfile_stake_amount_per_byte_minute(DH_wallet).muls(scope);
		amounts[2] = biddingStorage.getOffer_max_token_amount_per_DH(import_id);
		amounts[3] = biddingStorage.getOffer_min_stake_amount_per_DH(import_id);
		amounts[4] = biddingStorage.getOffer_min_reputation(import_id);
		if(amounts[1] == 0) amounts[1] = 1;

		uint256 number_of_escrows = profileStorage.getProfile_number_of_escrows(DH_wallet);
		uint256 reputation = profileStorage.getProfile_reputation(DH_wallet);
		if(number_of_escrows == 0 || reputation == 0) reputation = 1;
		else reputation = (MyMath.logs2(reputation / number_of_escrows) * corrective_factor / 115) / (corrective_factor / 100);
		if(reputation == 0) reputation = 1;

		uint256 hash_difference = MyMath.absoluteDifference(data_hash, uint256(uint128(keccak256(abi.encodePacked(DH_wallet)))));

		uint256 hash_f = ((data_hash * (2**128)) / (hash_difference + data_hash));
		uint256 price_f = corrective_factor - ((corrective_factor * amounts[0]) / amounts[2]);
		uint256 stake_f = ((corrective_factor - ((amounts[3] * corrective_factor) / amounts[1])) * data_hash) / (hash_difference + data_hash);
		uint256 rep_f = (corrective_factor - (amounts[4] * corrective_factor / reputation));
		ranking = ((hash_f * (corrective_factor + price_f + stake_f + rep_f)) / 4) / corrective_factor;
	}
}