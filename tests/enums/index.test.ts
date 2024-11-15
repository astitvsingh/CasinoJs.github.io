//@collapse

/**
 * @file `index.test.ts`
 * This file contains unit tests for the centralized export of all enums related to poker and casino operations.
 * It verifies that each enum is correctly exported and accessible, and that the values within the enums
 * are as expected.
 *
 * Enums being tested:
 * - `PokerPhases`: Represents different phases of a poker game (e.g., pre-flop, flop, turn, river).
 * - `Rank`: Represents the ranks of playing cards (e.g., Ace, King, Queen).
 * - `Suit`: Represents the suits of playing cards (e.g., Hearts, Spades).
 * - `CasinoEvents`: Represents event names triggered by state changes in the casino.
 *
 * @example
 * // This test file ensures that you can import all enums like this:
 * import { Rank, Suit, PokerPhases, CasinoEvents } from './src/enums';
 *
 * @see `./src/enums/index.ts`
 */

import * as Enums from "../../src/enums";

/**
 * @testgroup Centralized Enum Exports
 * The following tests verify the correct export of enums from the centralized `index.ts` file in the enums directory.
 */

describe("Enum Centralized Exports", () => {
  /**
   * @test `PokerPhases` export verification
   * This test ensures that the `PokerPhases` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have phases like "PreFlop", "Flop", "Turn", "River", "Showdown"
   */
  it("should export PokerPhases enum with correct values", () => {
    const { PokerPhases } = Enums;

    expect(PokerPhases.PRE_FLOP).toBe("Pre-Flop");
    expect(PokerPhases.FLOP).toBe("Flop");
    expect(PokerPhases.TURN).toBe("Turn");
    expect(PokerPhases.RIVER).toBe("River");
    expect(PokerPhases.SHOWDOWN).toBe("ShowDown");
  });

  /**
   * @test `Rank` export verification
   * This test ensures that the `Rank` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have ranks like "Ace", "King", "Queen", "Jack"
   */
  it("should export Rank enum with correct values", () => {
    const { Rank } = Enums;

    expect(Rank.Ace).toBe("A");
    expect(Rank.King).toBe("K");
    expect(Rank.Queen).toBe("Q");
    expect(Rank.Jack).toBe("J");
  });

  /**
   * @test `Suit` export verification
   * This test ensures that the `Suit` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have suits like "Hearts", "Spades", "Clubs", "Diamonds"
   */
  it("should export Suit enum with correct values", () => {
    const { Suit } = Enums;

    expect(Suit.Hearts).toBe("Hearts");
    expect(Suit.Spades).toBe("Spades");
    expect(Suit.Clubs).toBe("Clubs");
    expect(Suit.Diamonds).toBe("Diamonds");
  });

  /**
   * @test `CasinoEvents` export verification
   * This test ensures that the `CasinoEvents` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have events like "Casino:PokerRoomCreated", "Casino:PokerRoomAdded", etc.
   */
  it("should export CasinoEvents enum with correct values", () => {
    const { CasinoEvents } = Enums;

    expect(CasinoEvents.ROOM_CREATED).toBe("Casino:PokerRoomCreated");
    expect(CasinoEvents.ROOM_ADDED).toBe("Casino:PokerRoomAdded");
    expect(CasinoEvents.ROOM_UPDATED).toBe("Casino:PokerRoomUpdated");
    expect(CasinoEvents.ROOM_DELETED).toBe("Casino:PokerRoomDeleted");
    expect(CasinoEvents.ROOMS_SET).toBe("Casino:PokerRoomsSet");
  });
});
