// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract BitBizaarItemMarketplace {
    // This defines a BitBizaar item 
    struct BitBizaarItem {
        uint256 id;
        address seller;
        string title;
        string description;
        string imageUrl; // This is intended to be optional
        uint256 price;
        bool sold;
    }

    // All of the items
    BitBizaarItem[] public items;

    // All of the items, mapped to an owner
    mapping(uint256 => address) public itemToOwner;

    // Event fired when an item is listed
    event ItemListed(uint256 id, string title, uint256 price);

    // Event fired when an item is purchased
    event ItemPurchased(uint256 id, string title, uint256 price, address buyer);

    // Creates a new item, and lists it for sale
    function listItem(string memory _title, string memory _description, string memory _imageUrl, uint256 _price) external {
        uint256 itemId = items.length;
        items.push(BitBizaarItem(itemId, msg.sender, _title, _description, _imageUrl,  _price, false));
        itemToOwner[itemId] = msg.sender;
        emit ItemListed(itemId, _title, _price);
    }

    // Purchases an existing item
    function purchaseItem(uint256 _itemId) external payable {
        require(_itemId < items.length, "Invalid item ID");
        BitBizaarItem storage item = items[_itemId];
        require(!item.sold, "Item already sold");
        require(msg.value >= item.price, "Insufficient funds");

        item.sold = true;
        address seller = item.seller;
        itemToOwner[_itemId] = msg.sender;
        payable(seller).transfer(msg.value);
        
        emit ItemPurchased(_itemId, item.title, item.price, msg.sender);
    }

    // Get all items listed for sale
    function getItemsForSale() external view returns (BitBizaarItem[] memory) {
        uint256 itemCount = 0;
        for (uint256 i = 0; i < items.length; i++) {
            if (!items[i].sold) {
                itemCount++;
            }
        }

        BitBizaarItem[] memory itemsForSale = new BitBizaarItem[](itemCount);
        uint256 index = 0;
        for (uint256 i = 0; i < items.length; i++) {
            if (!items[i].sold) {
                itemsForSale[index] = items[i];
                index++;
            }
        }

        return itemsForSale;
    }
}