//collapse

// Import Enums
import { PokerPhases } from "../../enums";

// Import Interfaces
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
  PokerPhaseInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { Deck } from "../deck";
import { PokerPhase } from "../pokerPhase";

// Import Utils
import { generateUniqueId, logger } from "../../utils";

/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends BaseEventEmitter
 */
class PokerGame extends BaseEventEmitter implements PokerGameInterface {
  /*************************************************************************************
   * PROPERTIES
   *************************************************************************************/

  /**
   * @property {DeckInterface} __id
   * The deck of cards used in the current PokerGame.
   */
  private __id: string = ``;

  /**
   * @property {string} __deck
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private __deck: DeckInterface = new Deck();

  /**
   * @property {number} __smallBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __smallBlind: number = 5;

  /**
   * @property {number} __bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __bigBlind: number = this.__smallBlind * 2;

  /**
   * @property {number} __bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __phases: PokerPhaseInterface[] = [];

  /**
   * @property {number} __bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __currentPhase: PokerPhaseInterface = new PokerPhase();

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __communityCards: CardInterface[] = [];

  private __players: PokerPlayerInterface[] = [];

  private __dealerPos: number = 0;

  private __smallBlindPos: number = 1;

  private __bigBlindPos: number = 2;

  private __pot: number = 0;

  /*************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   *************************************************************************************/

  /**
   * constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config?: PokerGameConfig) {
    super();
    config ? this.__init(config) : this.__init();
  }

  /**
   * `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config?: PokerGameConfig): void {
    if (config) {
      this.__id = config.id ? config.id : generateUniqueId();
      this.__deck = new Deck();
      this.__smallBlind = config.smallBlind
        ? config.smallBlind
        : this.__smallBlind;
      this.__bigBlind = config.bigBlind ? config.bigBlind : this.__bigBlind;
      this.__communityCards = this.__communityCards;
      this.__players = config.players ? config.players : this.__players;
      this.__pot = this.__pot;
      this.__dealerPos = this.__dealerPos;
      this.__smallBlindPos = this.__smallBlindPos;
      this.__bigBlindPos = this.__bigBlindPos;
      this.__phases = this.__phases;
      this.__currentPhase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        deck: this.__deck,
        players: [],
        pot: 0,
        dealerPos: 0,
        smallBlindPos: 0,
        bigBlindPos: 0,
      });
      this.__validatePlayerList();
    } else {
    }
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  public getPlayers(): PokerPlayerInterface[] {
    return this.__players;
  }

  public getDeck(): DeckInterface {
    return this.__deck;
  }

  public getPot(): number {
    return this.__pot;
  }

  public getDealerPos(): number {
    return this.__dealerPos;
  }

  public getSmallBlindPos(): number {
    return this.__smallBlindPos;
  }

  public getBigBlindPos(): number {
    return this.__bigBlindPos;
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/
  private __tagPos(): void {
    if ((this.getPlayers().length = 2)) {
      this.__setDealerPos(0);
      this.__setSmallBlindPos(1);
      this.__setBigBlindPos(0);
    } else if (this.getPlayers().length >= 3) {
      this.__setDealerPos(0);
      this.__setSmallBlindPos(1);
      this.__setBigBlindPos(2);
    }
  }

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**
   * `advancePhase`
   * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
   * @returns {void}
   */
  private __advancePhase(): void {}

  /**
   * `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  private __resolveBets(): void {}

  private __validatePlayerList(): boolean {
    if (this.getPlayers().length < 2) {
      throw new Error("Players are lesser than two.");
    } else {
      return true;
    }
  }
  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  private __setPot(pot: number): number {
    return (this.__pot = pot);
  }

  private __setPlayers(
    players: PokerPlayerInterface[]
  ): PokerPlayerInterface[] {
    return (this.__players = players);
  }

  private __setDealerPos(pos: number): boolean {
    this.__dealerPos = pos;
    return true;
  }

  private __setSmallBlindPos(pos: number): boolean {
    this.__smallBlindPos = pos;
    return true;
  }

  private __setBigBlindPos(pos: number): boolean {
    this.__bigBlindPos = pos;
    return true;
  }
}

export { PokerGame };
