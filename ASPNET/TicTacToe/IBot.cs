using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe
{
    interface IBot
    {
        void MakeMove(object sender, EventArgs e, int TurnCount);
    }
}
