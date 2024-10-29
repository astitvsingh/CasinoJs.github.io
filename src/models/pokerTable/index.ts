import { EventEmitter } from "events";
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
  PokerTableConfig,
  PokerTableInterface,
  PokerPlayerConfig,
} from "../../interfaces";
import { PokerPlayer } from "../pokerPlayer";
import { PokerSeat } from "../pokerSeat";
import {generateUniqueId} from "../../utils";

/**
 * @interface `PokerTable`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerTable extends EventEmitter implements PokerTableInterface {
  
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/


  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __id: string = ``;

   /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __smallBlind: number = 5;

  
   /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __bigBlindAmount: number = this.__smallBlind*2;

  /**
   * @property {PokerSeatInterface[]} __seats
   * An array of players currently seated at the PokerTable.
   */
  private __seats: PokerSeatInterface[] =[];

  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __queue: PokerPlayerInterface[] = [];

  /**
   * @property {boolean} gameInProgress
   * A boolean indicating whether a PokerGame is currently in progress at the table.
   */
  private __gameInProgress: boolean = false;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerTableConfig | undefined) {
    super();
    this.__init(config);
  }

  /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config: PokerTableConfig | undefined): void {
    if (config) {
      this.__id = config.id ? config.id : this.__generateId();
      this.__smallBlind = config.smallBlind
        ? config.smallBlind
        : 5;
      this.__bigBlindAmount = this.__smallBlind * 2;
      this.__seats = [];
      this.__gameInProgress = false;
      
      for (let i = 0; this.getSeats().length !== config.size; i++) {
        const seat = new PokerSeat({
          id: ``,
          position: i,
          isDealer: false,
          isBigBlind: false,
          isSmallBlind: false,
          player: undefined,
        });
        this.__seats?.push(seat);
      }
    }   
  }

   /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/
  
   /**
   * #### Description
   * Sets the queue of players waiting to enter the `PokerTable` within the `PokerRoom`. This queue helps
   * manage player flow and assign seating as tables become available.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setQueue` method provides a structured way to set or update the player queue. This queue is essential
   * for room management, helping to keep a record of players awaiting entry and manage seating arrangements.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `queue`: An array of `PokerPlayerInterface` objects, each representing a player awaiting entry into the room’s `PokerTable`.
   *
   * #### Requirements
   * - `queue` should be an array of valid `PokerPlayerInterface` instances.
   * - If empty, the queue indicates that no players are currently waiting for entry.
   *
   * #### Returns
   * - Returns the `queue` array after updating it within the room.
   *
   * #### Usage
   * Use this method to set or update the player queue in cases where player flow needs control,
   * ensuring smooth transitions as players are seated at the table.
   *
   * @param {PokerPlayerInterface[]} queue - The new list of players waiting to enter the table.
   * @returns {PokerPlayerInterface[]} - Returns the updated player queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room2", tableSize: 6 });
   * const queue = [new PokerPlayer("Alice"), new PokerPlayer("Bob")];
   * pokerRoom.setQueue(queue); // Sets the player queue
   * console.log(pokerRoom.getQueue()); // Logs the updated player queue
   * ```
   */
  public setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return this._setQueue(queue);
  } 
  
  /**
  * #### Description
  * Sets the queue of players waiting to enter the `PokerTable` within the `PokerRoom`. This queue helps
  * manage player flow and assign seating as tables become available.
  *
  * #### Implements
  * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
  *
  * #### Overrides
  * `N/A` - This method does not override any superclass or parent methods.
  *
  * #### Purpose
  * The `setQueue` method provides a structured way to set or update the player queue. This queue is essential
  * for room management, helping to keep a record of players awaiting entry and manage seating arrangements.
  *
  * #### Events
  * `N/A` - No events are emitted by this method.
  *
  * #### Parameters
  * - `queue`: An array of `PokerPlayerInterface` objects, each representing a player awaiting entry into the room’s `PokerTable`.
  *
  * #### Requirements
  * - `queue` should be an array of valid `PokerPlayerInterface` instances.
  * - If empty, the queue indicates that no players are currently waiting for entry.
  *
  * #### Returns
  * - Returns the `queue` array after updating it within the room.
  *
  * #### Usage
  * Use this method to set or update the player queue in cases where player flow needs control,
  * ensuring smooth transitions as players are seated at the table.
  *
  * @param {PokerPlayerInterface[]} queue - The new list of players waiting to enter the table.
  * @returns {PokerPlayerInterface[]} - Returns the updated player queue.
  *
  * @example
  * ```typescript
  * const pokerRoom = new PokerRoom({ name: "Room2", tableSize: 6 });
  * const queue = [new PokerPlayer("Alice"), new PokerPlayer("Bob")];
  * pokerRoom.setQueue(queue); // Sets the player queue
  * console.log(pokerRoom.getQueue()); // Logs the updated player queue
  * ```
  */
 public setSmallBlind(smallBlind: number): number {
   return this._setSmallBlind(smallBlind);
 }
   
  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getId(): string {
    return this.__id;
  }

  /**
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getSmallBlind(): number {
    return this.__smallBlind;
  }

  /**
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getBigBlind(): number {
    return this.__bigBlindAmount;
  }

  /**
   * @method `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSeats(): PokerSeatInterface[] {
    return this.__seats;
  }

  
  /**
   * #### Description
   * Retrieves the current queue of players awaiting seating in the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is part of `PokerRoomInterface` without implementing external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getQueue` method is essential for accessing the list of players waiting for a seat in the `PokerRoom`.
   * It provides insight into the queue length and composition, helping manage room capacity and player flow.
   *
   * #### Events
   * `N/A` - This method does not emit any events.
   *
   * #### Parameters
   * `N/A` - No parameters are required for this method.
   *
   * #### Requirements
   * `N/A` - This method simply returns the existing queue without modifying it.
   *
   * #### Returns
   * - Returns an array of `PokerPlayerInterface` instances, representing the players in the waiting queue.
   *
   * #### Usage
   * Call this method to view the list of players awaiting entry to the room. This can be used for monitoring,
   * player assignment, and room management purposes.
   *
   * @returns {PokerPlayerInterface[]} - An array containing the players in the waiting queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Lobby", tableSize: 6 });
   * console.log(pokerRoom.getQueue()); // Logs an array of players awaiting seating
   * ```
   */
  public getQueue(): PokerPlayerInterface[] {
    return this.__queue;
  }
  
  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * @method `getQueue`
   * @public
   * Returns the poker room's `name`.
   * @returns {PokerPlayerInterface[]} The poker room's `name`.
   *
   * @example
   * const rank = card.getName();
   * console.log(rank); // "A"
   */
  public addToQueue(config: PokerPlayerConfig): boolean {
    const player = new PokerPlayer(config);
    this.__queue.push(player);
    return true;
  }

  public moveToTable(seatPostion: number): boolean {
    let roomSeats = this.getSeats();
    if (roomSeats) {
      for (let index = 0; index < roomSeats.length; index++) {
        if (
          roomSeats[index].getPosition() === seatPostion &&
          !roomSeats[index].isOccupied() &&
          this.getQueue().length >= 1
        ) {
          let queue = this.getQueue();
          let pokerPlayer = queue.splice(0, 1);
          this.setQueue(queue);
          roomSeats[index].setPlayer(pokerPlayer[0]);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * update
   */
  public updateBlinds(smallBlind:number) {
    this._setSmallBlind(smallBlind);
    this._setBigBlind(this.getSmallBlind()*2);
    return true;
  }

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/
   
  /**
   * @method `getSize`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public size(): number {
    return this.seatCount();
  }

  /**
   * #### Description
   * Returns the total number of `PokerRoom` instances currently managed by the Casino.
   *
   * #### Implements
   * Implements the `roomCount` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Provides a simple way to check how many poker rooms the Casino is currently managing. Useful for general
   * information about the Casino's state and for validating indices or conditions that depend on room count.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * `N/A`
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the number of rooms currently managed by the Casino.
   *
   * #### Usage
   * This method is useful for any scenario where the total number of active rooms is needed, such as iterating
   * over all rooms or validating index-based operations.
   *
   * @returns {number} - The current count of rooms in the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const count = casino.roomCount();
   * console.log(count); // Logs the total number of managed rooms, e.g., 5
   * ```
   */
   public seatCount(): number {
    return this.getSeats().length;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/
  protected _setSmallBlind(smallBlind: number): number {
    if (smallBlind<=0) {
      throw new Error(`Small Blind should always be greator than 0.`)
    } else{
      return this.__smallBlind = smallBlind;
    }
  }

  protected _setBigBlind(bigBlind: number): number {
    return this.__bigBlindAmount = bigBlind;
  }

  protected _setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[] {
    this.__queue = queue;
    return this.__queue;
  }
  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * @method `setId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  
  /**
   * @method `setSeats`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setSeats(seats: PokerSeatInterface[]): boolean {
    this.__seats = seats;
    return true;
  }

  
  private __occupySeat(position: number, player: PokerPlayerInterface): boolean {
    for (let i = 0; i < this.getSeats().length; i++) {
      let seat = this.getSeats()[i];
      let seatPosition = seat.getPosition();
      if (seatPosition === position) {
        if (!seat.isOccupied()) {
          seat.setPlayer(player);
          console.log("Seat has been assigned");
          return true;
        }
      }
    }
    return false;
  }


   /**
   * #### Description
   * The `__generateId` method generates a unique identifier string. This ID is used internally
   * to uniquely identify instances or components within the `PokerRoom` class, helping manage
   * each room separately by its own ID.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * The purpose of the `__generateId` method is to provide a consistent, automatic way
   * to generate unique IDs, ensuring that each `PokerRoom` instance has its own distinct
   * identifier. This prevents conflicts or confusion between instances.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * This method does not take any parameters.
   *
   * #### Requirements
   * - Utilizes the `generateUniqueId` function from an external library or internal utility.
   * - This function must be capable of producing unique, non-repeating strings each time it's called.
   *
   * #### Returns
   * The method returns a `string` type, representing a unique identifier.
   *
   * #### Usage
   * Typically used internally within the `PokerRoom` or `Casino` classes when a new
   * room instance is created, this method is called automatically without requiring
   * external intervention.
   *
   * @returns {string} - A unique string identifier generated by the `generateUniqueId` function.
   *
   * @throws {Error} - This method does not throw any errors.
   *
   * @example
   * ```typescript
   * class PokerRoom {
   *   private __id: string = this.__generateId();
   * 
   *   private __generateId(): string {
   *     return generateUniqueId(); // Creates a new unique ID for this PokerRoom instance
   *   }
   * }
   *
   * const room = new PokerRoom();
   * console.log(room.__id); // Outputs a unique identifier, e.g., "room_12345abc"
   * ```
   */
   private __generateId(): string {
    return generateUniqueId();
  }
  
 
}

export { PokerTable };
