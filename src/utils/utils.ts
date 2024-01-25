
export const colorsRoullet = [
    '#db7093',
    '#20b2aa',
    '#daa520',
    '#ff340f',
    '#4169e1',
    '#3cb371',
    '#d63e92',
    '#ff7f50',
    '#FFC133',
];

export const DEFAULT_VALUES_ROULLET = [
    {
        name: '1',
        color: colorsRoullet[0]
    },
    {
        name: '50',
        color: colorsRoullet[1]
    },
    {
        name: '0',
        color: colorsRoullet[2]
    },
    {
        name: '1000',
        color: colorsRoullet[3]
    },
    {
        name: '10',
        color: colorsRoullet[4]
    },
    {
        name: '5',
        color: colorsRoullet[5]
    },
    {
        name: '20',
        color: colorsRoullet[6]
    },
    {
        name: '109',
        color: colorsRoullet[7]
    },
]

export function formatArrayForTextArea(stringsArray: string[] | null) {
    return stringsArray ? stringsArray.join('\n') : undefined;
}

export function transformArrayToString(array: string[]) {
    if (array.length === 0) {
      return [];
    }
  
    // Transforma cada string do array, dividindo por quebras de linha
    const transformedArray = array.flatMap((str) => str.split('\n'));

    return transformedArray;
}
  