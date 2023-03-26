
pragma solidity ^0.8.0;

// Import the ERC20 interface and the SafeMath library
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Import the Verifier contract
import "./verifier.sol";

// Define the CarbonRegistry contract
contract Registry {
    using SafeMath for uint256;

    // The address of the Token contract
    address public tokenAddress;

    // The address of the Verifier contract
    address public verifierAddress;

    // A struct to represent a project
    struct Artwork {
        address Artist;
        uint256 price;
        bool verified;
    }

    // An array of projects
    Artwork[] public artworks;

    // A mapping of project owners to their project indices
    mapping(address => uint256) public artistToIndex;

    // An event to indicate that a new project has been added to the registry
    event ArtworkAdded(address indexed Artist, uint256 indexed price, uint256 artworkIndex);

    // An event to indicate that a project has been verified
    //event ArtworkVerified(uint256 indexed artworkIndex);

    // An event to indicate that a customer has redeemed a carbon credit
    event CarbonCreditRedeemed(address indexed customer, uint256 indexed mwh); //?????/////////////////////////////

    // Modifier to restrict access to the Verifier contract
    modifier onlyVerifier() {
        require(msg.sender == verifierAddress, "Only the Verifier contract can call this function");
        _;
    }

    // The constructor function
    constructor(address _tokenAddress, address _verifierAddress) {
        require(_tokenAddress != address(0), "Invalid Token contract address");
        require(_verifierAddress != address(0), "Invalid Verifier contract address");
        tokenAddress = _tokenAddress;
        verifierAddress = _verifierAddress;
    }

    // A function to add a new project to the registry
    function addArtwork(uint256 price) public {
        require(price > 0, "Invalid price");
        require(IERC20(tokenAddress).balanceOf(msg.sender) >= price, "Insufficient token balance");
        require(IERC20(tokenAddress).allowance(msg.sender, address(this)) >= price, "Insufficient token allowance");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), price);
        uint256 index = artworks.length;
        artworks.push(Artwork({
            Artist: msg.sender,
            price: price,
            verified: false
        }));
        artistToIndex[msg.sender] = index;
        emit ArtworkAdded(msg.sender, price, index);
    }

    
    // A function to verify a project
    function verifyArtwork(uint256 artworkIndex) public onlyVerifier {
        require(artworkIndex < artworks.length, "Invalid artworok index");
        require(!artworks[artworkIndex].verified, "Artwork has already been verified");
        Verifier verifier = verifier(verifierAddress);
        verifier.approveArtwork(address(this));
        if (verifier.isArtworkVerified(address(this))) {
            artworks[artworkIndex].verified = true;
            emit ArtworkVerified(projectIndex);
            // Mint tokens proportional to the mwh generated
            //uint256 mwh = projects[projectIndex].mwh;
            //uint256 tokenAmount = mwh.mul(10**18); // 1 token per mwh
            //IERC20(tokenAddress).mint(projects[projectIndex].owner, tokenAmount);
        }
    }
    
}
