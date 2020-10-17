export class GameMap {
    createDataRepresentation() {
        return {
            terrain: this.terrain,
        }
    }
}

export const CreateNewGameMap = () => {
    const map = new GameMap()

    map.terrain = [...Array(20)].map(() => Array(10).fill(0))
    map.buildings = []
    map.maxPlayers = 2
    map.startingUnits = [null, null]

    return map
}

export const ValidateMap = mapContainer => {
    // TODO
}
