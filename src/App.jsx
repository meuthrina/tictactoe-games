import { useState } from "react";

//? valueFor => menentukan value X / O index suatu kotak
//? handleCLickOfIndex => fungsi yang dijalankan ketika sebuah square di klik
function Square({ valueFor, handleCLickOfIndex }) {
  return (
    <button
      onClick={handleCLickOfIndex} // handleClick(indexSquare)
      className="size-[150px] border-[1px] text-7xl border-black cursor-pointer"
    >
      {/* Isi value X atau O pada index kotak yang di click */}
      {/* currentSquares[index] */}
      {valueFor}
    </button>
  );
}

//? xTurn => menentukan kondisi giliran pemain
//? currentSquares = currentSquares => menyimpan kondisi terkini dari setiap langkah pemain
//? updateHistory = updateHistory => fungsi untuk memperbarui history ketika ada langkah baru
/** Kondisi Awal yang diterima
 * xTurn = true --> awal permainan: status giliran X
 * currentSquares = history[0]
 * history = [
 *   [null, null, null, null, null, null, null, null], --> history[0] === currentSquares
 *  ]
 * updateHistory = () --> belum dijalankan
 */
/** Kondisi yang diterima Setelah 2 Langkah
 * 1. Setelah pemain pertama: X mengisi value pada square ke-1
 * xTurn === false --> tampilan status "giliran O"
 * currentSquares = history[1]
 * history = [
 *   [null, null, null, null, null, null, null, null], --> history[0]
 *   ["X", null, null, null, null, null, null, null], --> history[1] ---> ditampilkan ke papan
 *  ]
 *
 * 2. Setelah pemain kedua: O mengisi value pada square ke-2
 * xTurn === true --> tampilan status "giliran X"
 * currentSquares = history[2]
 * history = [
 *   [null, null, null, null, null, null, null, null], --> history[0]
 *   ["X", null, null, null, null, null, null, null], --> history[1]
 *   ["X", "O", null, null, null, null, null, null], --> history[2] --> ditampilkan ke papan
 *  ]
 * updateHistory = ()
 */
const Board = ({ xTurn, currentSquares, updateHistory }) => {
  //
  //? updateValue => fungsi yang dijalankan ketika sebuah square di klik
  //? idxSquareOnClickValue => value dari index square yang di klik
  //! Execution User: 1. Pemain X mengisi Square ke-1 && Pemain O mengisi Square ke-2 ↲
  /** Kondisi Eksekusi
   * 1. Pemain pertama: X mengisi Square ke-1 === currentSquares[0] === handleClick(0)
   * 2. Pemain kedua: O mengisi Square ke-2 === currentSquares[1] handleClick(1)
   */
  //! Execution User: 2. updateValueSquare yang diclick ↲
  const updateValueSquare = (idxSquareOnClickValue) => {
    /** Cek Kondisi Eksekusi Dulu
     *  Jangan jalankan fungsi handleClick(), jika:
     *  1. Kotak yang di click sudah memiliki value ( X / O )
     *  2. Return apapun yang dihasilkan dari fungsi calculateWinnerEvery()
     */
    if (
      currentSquares[idxSquareOnClickValue] !== null ||
      calculateWinnerEvery(currentSquares)
    )
      return;

    /** Kondisi dari Inisialisasi
     * currentSquares = history[0]
     * history = [
     *   [null, null, null, null, null, null, null, null], -->  currentSquares
     *  ]
     */
    //! Execution User: 3. Buat penyimpanan currentHistory dari currentSquares ↲
    const newCurrentSquares = currentSquares.slice();
    /** Kondisi setelah Eksekusi Player
     * 1. Setelah pemain pertama mengisi value pada square ke-1
     * newCurrentSquares = [null, null, null, null, null, null, null, null], --> di slice (diambil) dari history[0]
     *
     *
     * 2. Setelah pemain kedua mengisi value pada square ke-2
     * newCurrentSquares = ["P1", null, null, null, null, null, null, null], --> di slice (diambil) dari history[1]
     */

    //! Execution User: 4. Isi value squares yang di click dengan ( X/O ) berdasarkan kondisi xTurn
    newCurrentSquares[idxSquareOnClickValue] = xTurn === true ? "X" : "O";
    /** Kondisi setelah Eksekusi Player
     * Kondisi Inisialisasi, xTurn === true
     *
     * 1. Setelah Pemain pertama: mengisi Square ke-1, di isi value "X"
     * newCurrentSquares = ["X", null, null, null, null, null, null, null]
     *
     * 2. Setelah Pemain kedua: mengisi Square ke-2, di isi value "O"
     * newCurrentSquares = ["X", "O", null, null, null, null, null, null]
     */

    //! Execution User: 5. update history berdasarkan currentHistory
    //? updateHistory = updateHistory() => fungsi untuk memperbarui history ketika ada langkah baru
    updateHistory(newCurrentSquares);
  };

  //? currentSquares => array terbaru yang menampung kondisi seluruh kotak
  //? getWinner => menyimpan status pemenang atau giliran pemain
  //? calculateWinnerEvery() => fungsi untuk menentukan aturan kemenangan berdasarkan langkah terbaru
  const getWinner = calculateWinnerEvery(currentSquares);
  let showInfo = "";
  // Jika value getWinner bukan false (return dari calculateWinnerEvery adalah squareValueOn[firstChoice])
  if (getWinner !== false) {
    // Jalankan fungsi berikut
    showInfo = "The Winner is " + getWinner;
  } else {
    // Jika value getWinner === false, lanjutkan permainan
    showInfo = "Next player: " + (xTurn === true ? "X" : "O");
  }

  //? Tampilkan showInfo dan semua Square
  return (
    <>
      {/* Tampilan showInfo */}
      <div className=" mx-auto text-center mb-4 ">{showInfo}</div>

      {/* Pembungkus Seluruh Kotak */}
      {/* Props valueFor, menentukan index kotak tersebut */}
      {/* Props handleCLickOfIndex, mengirim anonymous function berdasarkan index square */}
      <div className="size-[450px] flex flex-wrap border-black mx-auto">
        <Square // Kotak ke-1
          valueFor={currentSquares[0]}
          handleCLickOfIndex={() => updateValueSquare(0)}
        />
        <Square // Kotak ke-2
          valueFor={currentSquares[1]}
          handleCLickOfIndex={() => updateValueSquare(1)}
        />
        <Square // Kotak ke-3
          valueFor={currentSquares[2]}
          handleCLickOfIndex={() => updateValueSquare(2)}
        />
        <Square // Kotak ke-4
          valueFor={currentSquares[3]}
          handleCLickOfIndex={() => updateValueSquare(3)}
        />
        <Square // Kotak ke-5
          valueFor={currentSquares[4]}
          handleCLickOfIndex={() => updateValueSquare(4)}
        />
        <Square // Kotak ke-6
          valueFor={currentSquares[5]}
          handleCLickOfIndex={() => updateValueSquare(5)}
        />
        <Square // Kotak ke-7
          valueFor={currentSquares[6]}
          handleCLickOfIndex={() => updateValueSquare(6)}
        />
        <Square // Kotak ke-8
          valueFor={currentSquares[7]}
          handleCLickOfIndex={() => updateValueSquare(7)}
        />
        <Square // Kotak ke-9
          valueFor={currentSquares[8]}
          handleCLickOfIndex={() => updateValueSquare(8)}
        />
      </div>
    </>
  );
};

//* Initiate: 1. Komponen Game
const Game = () => {
  //
  //* Initiate: 2. State History
  //? history => array yang menyimpan kondisi setiap 1 langkah pemain (seluruh history)
  /** Kondisi Inisialisasi 
   * history = [
      [null, null, null, null , null, null, null, null],
      ]
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //! Execution User: 10. Update value history dari value newHistory ↲
  /** Kondisi Setelah Eksekusi Player
   * 1. Setelah pemain pertama: X mengisi value pada square ke-1
   * history = [
   *   [null, null, null, null, null, null, null, null],
   *   ["X", null, null, null, null, null, null, null],
   * ]
   *
   * 2. Setelah pemain kedua: O mengisi value pada square ke-2
   * history = [
   *   [null, null, null, null, null, null, null, null],
   *   ["X", null, null, null, null, null, null, null],
   *   ["X", "O", null, null, null, null, null, null],
   * ]
   */

  //* Initiate: 3. State countStep
  //? countStep => menghitung jumlah dari setiap langkah pemain
  /** Kondisi Inisialisasi
   * countStep === 0
   * Karena belum ada pemain yang memulai
   */
  const [countStep, setCountStep] = useState(0);
  //! Execution User: 11. Update value countStep berdasarkan jumlah newHistory - 1 ↲
  /** Kondisi Setelah Eksekusi Player
   * 1. Setelah pemain pertama: X mengisi value pada square ke-1
   * countStep === 1
   *
   * 1. Setelah pemain kedua: O mengisi value pada square ke-2
   * countStep === 2
   */

  //* Initiate: 4. Mengetahui Giliran
  //? xTurn => Menentukan giliran
  /** Kondisi Inisialisasi
   * xTurn = countStep % 2 === 0
   * xTurn = 0 % 2 === 0
   * xTurn === true --> Pemain X memulai terlebih dahulu
   */
  const xTurn = countStep % 2 === 0;
  //! Execution User: 11. Update kondisi giliran ↲
  /** Kondisi Setelah Eksekusi Player
   * 1. Setelah pemain pertama: X mengisi value pada square ke-1
   * xTurn = 1 % 2 === 1 --> xTurn = false
   *
   * 2. Setelah pemain kedua: O mengisi value pada square ke-2
   * xTurn = 2 % 2 === 0 --> xTurn = true
   */

  //* Initiate: 5. History terkini
  //? currentSquares => menyimpan kondisi terkini dari setiap langkah pemain
  /** Kondisi Inisialisasi
   * currentSquares = history[0]
   * history = [
   *   [null, null, null, null, null, null, null, null], --> history[0] === currentSquares
   *  ]
   */
  const currentSquares = history[countStep];
  //! Execution User: 12. Update kondisi terkini dari Squares ↲
  /** Kondisi Setelah Eksekusi Player
   * 1. Setelah pemain pertama: X mengisi value pada square ke-1
   * countStep === 1
   * currentSquares = history[1]
   * history = [
   *   [null, null, null, null, null, null, null, null], --> history[0]
   *   ["X", null, null, null, null, null, null, null], --> history[1] === currentSquares
   *  ]
   *
   * 2. Setelah pemain kedua: O mengisi value pada square ke-2
   * countStep === 2
   * currentSquares = history[2]
   * history = [
   *   [null, null, null, null, null, null, null, null], --> history[0]
   *   ["X", null, null, null, null, null, null, null], --> history[1]
   *   ["X", "O", null, null, null, null, null, null], --> history[2] === currentSquares
   *  ]
   */

  //? jumpTo => fungsi untuk kembali ke history tertentu
  //? indexHistory => index dari (langkah tertentu dalam) history
  function jumpTo(indexHistory) {
    setCountStep(indexHistory);
    setXTurn(indexHistory % 2 === 0);
  }

  //? updateHistory => fungsi untuk memperbarui history ketika ada langkah baru
  //? currentHistory = newCurrentSquare => menampung kondisi terkini dari langkah pemain
  //! Execution User: 6. Update history berdasarkan newCurrentSquares (currentHistory) ↲
  function updateHistory(currentHistory) {
    /** Kondisi setelah Eksekusi Player
     * currentHistory === newCurrentSquares
     *
     * 1. Setelah Pemain pertama: mengisi Square ke-1, di isi value "X"
     * currentHistory = ["X", null, null, null, null, null, null, null], === newCurrentSquares
     *
     * 2. Setelah Pemain kedua: mengisi Square ke-2, di isi value "O"
     * currentHistory = ["X", "O", null, null, null, null, null, null] === newCurrentSquares
     */
    //! Execution User: 7. Buat history baru berdasarkan kondisi kondisi history + newCurrentSquares (currentHistory) ↲
    const newHistory = [...history.slice(0, countStep + 1), currentHistory];
    /** Kondisi setelah Eksekusi player
     * 1. Setelah pemain pertama: X mengisi value pada square ke-1
     * Kondisi inisialisasi, countStep === 0
     * newHistory = [
     *   [null, null, null, null, null, null, null, null], --> di slice (diambil dari history)
     *   ["X", null, null, null, null, null, null, null], ---> currentHistory === newCurrentSquare
     * ]
     *
     * 2. Setelah pemain kedua: O mengisi value pada square ke-2
     * newHistory = [
     *   [null, null, null, null, null, null, null, null], --> di slice (diambil dari history)
     *   ["X", null, null, null, null, null, null, null], ---> di slice (diambil dari history)
     *   ["X", "O", null, null, null, null, null, null], ---> currentHistory === newCurrentSquare
     * ]
     */

    // Ubah value history dengan value dari newHistory
    /** Kondisi Inisialisasi History
     * history = [
     *   [null, null, null, null, null, null, null, null]
     * ]
     */
    //! Execution User: 8. Update value history berdasarkan value newHistory ↲
    setHistory(newHistory);
    /** Kondisi setelah EKsekusi Player
     * 1. Setelah pemain pertama: X mengisi value pada square ke-1
     * history = newHistory = [
     *   [null, null, null, null, null, null, null, null],
     *   ["X", null, null, null, null, null, null, null],
     * ]
     *
     * 2. Setelah pemain kedua: O mengisi value pada square ke-2
     * history = newHistory = [
     *   [null, null, null, null, null, null, null, null],
     *   ["X", null, null, null, null, null, null, null],
     *   ["X", "O", null, null, null, null, null, null],
     * ]
     */

    /** Kondisi Inisialisasi
     * countStep === 0
     */
    //! Execution User: 9. Update value countStep berdasarkan jumlah newHistory - 1 ↲
    setCountStep(newHistory.length - 1);
    /** Kondisi setelah EKsekusi player
     * 1. Setelah pemain pertama: X mengisi value pada square ke-1
     * newHistory = [
     *   [null, null, null, null, null, null, null, null],
     *   ["X", null, null, null, null, null, null, null],
     * ]
     * countStep = 2 - 1
     *
     * countStep = 1
     *
     * 2. Setelah pemain kedua: O mengisi value pada square ke-2
     * history = [
     *   [null, null, null, null, null, null, null, null],
     *   ["X", null, null, null, null, null, null, null],
     *   ["X", "O", null, null, null, null, null, null],
     * ]
     * countStep = 3 - 1
     *
     * countStep = 2
     */
  }

  //* Initiate: 6. Tampilkan Status History
  //? showHistoryList => menyimpan seluruh list perubahan atau setiap history langkah pemain yang untuk dicetak
  //? indexHistory => index dari (langkah tertentu dalam) history
  /** Kondisi Awal
   * Map history --> Cetak history setiap ada langkah pemain atau perubahan yang terjadi
   * history = [
   *   [null, null, null, null, null, null, null, null] --> indexHistory === 0 --> showHistoryList= ["Restart"]
   *  ]
   */
  //! Execution User: 13. Update list history berdasakran kondisi terkini dari history ↲
  const showHistoryList = history.map((eachHistory, indexHistory) => {
    /** Kondisi Setelah 2 Langkah Pemain
     * Map history --> Cetak history setiap ada langkah pemain
     * 1. Setelah pemain pertama: X mengisi value pada square ke-1
     * history = [
     *   [null, null, null, null, null, null, null, null], --> indexHistory 0 --> showHistoryList= ["Restart"]
     *   ["X", null, null, null, null, null, null, null], --> indexHistory 1 --> showHistoryList= ["Go to move #1"]
     * ]
     *
     * 2. Setelah pemain kedua: O mengisi value pada square ke-2
     * history = [
     *   [null, null, null, null, null, null, null, null], --> indexHistory 0 --> showHistoryList= ["Restart"]
     *   ["X", null, null, null, null, null, null, null], --> indexHistory 1 --> showHistoryList= ["Go to move #1"]
     *   ["X", "O", null, null, null, null, null, null], --> indexHistory 2 --> showHistoryList= ["Go to move #2"]
     * ]
     *
     * Setiap indexHistory akan dicetak dan disimpan dalam variabel showHistoryList sebagai list item
     * Tampilan history akan bertambah seiring langkah pemain
     */
    let showHistory = "";
    if (indexHistory > 0) {
      showHistory = "Go to move #" + indexHistory;
    } else {
      showHistory = "Restart";
    }
    return (
      <li
        key={indexHistory}
        className=" box-border border-[1px] border-black p-4"
      >
        <button onClick={() => jumpTo(indexHistory)} className="cursor-pointer">
          {showHistory}
        </button>
      </li>
    );
  });

  //* Initiate: 7. Render Komponen Board & Tampilan TimeTravel
  /** Kondisi Inisialisasi
   * xTurn === true --> dimulai dari giliran X
   * currentSquares = history[0]
   * history = [
   *   [null, null, null, null, null, null, null, null], --> history[0] === currentSquares
   *  ]
   * updateHistory = ()
   */
  //? Props Board dikirim ke parameter komponen Board
  return (
    <div className="flex gap-4 justify-center mt-7 mx-auto w-full">
      <div>
        {/* //! Execution: 7. Render Komponen Board & Tampilan TimeTravel ↲
         */}
        <Board
          xTurn={xTurn}
          currentSquares={currentSquares}
          updateHistory={updateHistory}
        />
        {/* Kondisi Setelah Eksekusi Player
         * 1. Setelah pemain pertama: X mengisi value pada square ke-1
         * xTurn === false --> tampilan status "giliran O"
         * currentSquares = history[1]
         * history = [
         *   [null, null, null, null, null, null, null, null], --> history[0]
         *   ["X", null, null, null, null, null, null, null], --> history[1] ---> ditampilkan ke papan
         *  ]
         *
         * 2. Setelah pemain kedua: O mengisi value pada square ke-2
         * xTurn === true --> tampilan status "giliran X"
         * currentSquares = history[2]
         * history = [
         *   [null, null, null, null, null, null, null, null], --> history[0]
         *   ["X", null, null, null, null, null, null, null], --> history[1]
         *   ["X", "O", null, null, null, null, null, null], --> history[2] --> ditampilkan ke papan
         *  ]
         * updateHistory = ()
         */}
      </div>

      {/* //? showHistoryList => menampilkan list item history setiap perubahan langkah pemain
       */}
      <div>
        <ol className=" list-decimal list-inside mt-10">{showHistoryList}</ol>
      </div>
    </div>
  );
};

export default Game;

//? calculatewinnerEvery => fungsi untuk menentukan aturan kemenangan
//? squareValueOn => cek kondisi setiap pemain mengisi sebuah Square
function calculateWinnerEvery(squareValueOn) {
  // squareValueOn === value dari currentSquares
  // AllLines = [ [0], [1], [2], [3], [4], [5], [6], [7] ]
  const AllLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Jalankan looping
  for (let lineIndex = 0; lineIndex < AllLines.length; lineIndex++) {
    // lineIndex === [firstChoice, secondChoice, thirdChoice]

    // Destructure setiap lineIndex
    const [firstChoice, secondChoice, thirdChoice] = AllLines[lineIndex];
    // firstChoice = lineIndex[0]
    // secondChoice = lineIndex[1]
    // thirdChoice = lineIndex[2]

    // firstChoice === currentSquares[firstChoice]
    // secondChoice === currentSquares[secondChoice]
    // thirdChoice === currentSquares[thirdChoice]

    // Jika pilihan pertama dan pilihan pertama === pilihan kedua dan pilihan pertama === pilihan ketiga
    if (
      squareValueOn[firstChoice] &&
      squareValueOn[firstChoice] === squareValueOn[secondChoice] &&
      squareValueOn[firstChoice] === squareValueOn[thirdChoice]
    ) {
      // return pemenang (value dari pilihan pertama)
      return squareValueOn[firstChoice];
    }
  }

  // ini adalah return dari fungsi CalculateWinnerEvery()
  return false;
}
