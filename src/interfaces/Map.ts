export interface Nation {
  bellicosity: number;
  name: string;
  qty: number;
  color: string;
  img: string;
}

export interface Tile {
  active: boolean;
  index: number;
  lineIndex: number;
  relative: boolean;
  params: {
    nation: Nation;
  };
}

export interface Line {
  index: number;
  tiles: Tile[];
}
