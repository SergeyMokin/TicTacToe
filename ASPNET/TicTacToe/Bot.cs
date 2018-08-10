using System;
using System.Windows.Forms;

namespace TicTacToe
{
    public partial class Form1: Form, IBot
    {

        public void MakeMove(object sender, EventArgs e, int TurnCount)
        {
            bool _turn;
            var button = (Button)sender;
            if (TurnCount == 1)
            {
                _turn = BotChoiceFirstTurn();
                if (_turn)
                {
                    return;
                }
            }
            _turn = BypassingWinnerStrategy();
            if (_turn)
            {
                return;
            }
            _turn = BotChoiceThirdAndMoreTurn("O", "O");
            if (!_turn)
            {
                _turn = BotChoiceThirdAndMoreTurn("X", "O");
            }
            if (!_turn)
            {
                if (TurnCount == 3)
                {
                    _turn = BotChoiceIfNotExistsThirdTurn();
                }
                if (!_turn)
                {
                    try
                    {
                        RemainingOpportunities();
                    }
                    catch
                    {

                    }
                }
            }
        }

        private void RemainingOpportunities()
        {
            foreach (var c in Controls)
            {
                var b = (Button)c;
                if (b.Enabled)
                {
                    b.Text = "O";
                    b.Enabled = false;
                    return;
                }
            }
        }

        private bool BypassingWinnerStrategy()
        {
            if (TurnCount == 3 && ((!C1.Enabled && !A3.Enabled && C1.Text == "X" && A3.Text == "X") || (!C3.Enabled && !A1.Enabled && C3.Text == "X" && A1.Text == "X")))
            {
                if ((!A1.Enabled || !A3.Enabled || !C1.Enabled || !C3.Enabled) && B2.Enabled)
                {
                    B2.Text = "O";
                    B2.Enabled = false;
                    return true;
                }
                if (A2.Enabled)
                {
                    A2.Text = "O";
                    A2.Enabled = false;
                    return true;
                }
                if (C2.Enabled)
                {
                    C2.Text = "O";
                    C2.Enabled = false;
                    return true;
                }
            }
            return false;
        }

        private bool BotChoiceFirstTurn()
        {
            if (B2.Enabled)
            {
                B2.Text = "O";
                B2.Enabled = false;
                return true;
            }
            if (A1.Enabled)
            {
                A1.Text = "O";
                A1.Enabled = false;
                return true; ;
            }
            if (A3.Enabled)
            {
                A3.Text = "O";
                A3.Enabled = false;
                return true; ;
            }
            if (C1.Enabled)
            {
                C1.Text = "O";
                C1.Enabled = false;
                return true; ;
            }
            if (C3.Enabled)
            {
                C3.Text = "O";
                C3.Enabled = false;
                return true; ;
            }
            return false;
        }

        private bool BotChoiceThirdAndMoreTurn(string text, string text2)
        {
            if (A2.Text == text && A3.Text == text && A1.Enabled)
            {
                A1.Text = text2;
                A1.Enabled = false;
                return true;
            }
            if (A1.Text == text && A2.Text == text && A3.Enabled)
            {
                A3.Text = text2;
                A3.Enabled = false;
                return true;
            }
            if (A1.Text == text && A3.Text == text && A2.Enabled)
            {
                A2.Text = text2;
                A2.Enabled = false;
                return true;
            }
            if (B2.Text == text && B3.Text == text && B1.Enabled)
            {
                B1.Text = text2;
                B1.Enabled = false;
                return true;
            }
            if (B1.Text == text && B2.Text == text && B3.Enabled)
            {
                B3.Text = text2;
                B3.Enabled = false;
                return true;
            }
            if (B1.Text == text && B3.Text == text && B2.Enabled)
            {
                B2.Text = text2;
                B2.Enabled = false;
                return true;
            }
            if (C2.Text == text && C3.Text == text && C1.Enabled)
            {
                C1.Text = text2;
                C1.Enabled = false;
                return true;
            }
            if (C1.Text == text && C2.Text == text && C3.Enabled)
            {
                C3.Text = text2;
                C3.Enabled = false;
                return true;
            }
            if (C1.Text == text && C3.Text == text && C2.Enabled)
            {
                C2.Text = text2;
                C2.Enabled = false;
                return true;
            }
            if (B1.Text == text && C1.Text == text && A1.Enabled)
            {
                A1.Text = text2;
                A1.Enabled = false;
                return true;
            }
            if (A1.Text == text && B1.Text == text && C1.Enabled)
            {
                C1.Text = text2;
                C1.Enabled = false;
                return true;
            }
            if (A1.Text == text && C1.Text == text && B1.Enabled)
            {
                B1.Text = text2;
                B1.Enabled = false;
                return true;
            }
            if (B2.Text == text && C2.Text == text && A2.Enabled)
            {
                A2.Text = text2;
                A2.Enabled = false;
                return true;
            }
            if (A2.Text == text && B2.Text == text && C2.Enabled)
            {
                C2.Text = text2;
                C2.Enabled = false;
                return true;
            }
            if (A2.Text == text && C2.Text == text && B1.Enabled)
            {
                B1.Text = text2;
                B1.Enabled = false;
                return true;
            }
            if (B3.Text == text && C3.Text == text && A3.Enabled)
            {
                A3.Text = text2;
                A3.Enabled = false;
                return true;
            }
            if (A3.Text == text && B3.Text == text && C3.Enabled)
            {
                C3.Text = text2;
                C3.Enabled = false;
                return true;
            }
            if (A3.Text == text && C3.Text == text && B3.Enabled)
            {
                B3.Text = text2;
                B3.Enabled = false;
                return true;
            }
            if (A1.Text == text && C3.Text == text && B2.Enabled)
            {
                B2.Text = text2;
                B2.Enabled = false;
                return true;
            }
            if (A1.Text == text && B2.Text == text && C3.Enabled)
            {
                C3.Text = text2;
                C3.Enabled = false;
                return true;
            }
            if (B2.Text == text && C3.Text == text && A1.Enabled)
            {
                A1.Text = text2;
                A1.Enabled = false;
                return true;
            }
            if (A3.Text == text && C1.Text == text && B2.Enabled)
            {
                B2.Text = text2;
                B2.Enabled = false;
                return true;
            }
            if (A3.Text == text && B2.Text == text && C1.Enabled)
            {
                C1.Text = text2;
                C1.Enabled = false;
                return true;
            }
            if (B2.Text == text && C1.Text == text && A3.Enabled)
            {
                A3.Text = text2;
                A3.Enabled = false;
                return true;
            }
            return false;
        }

        private bool BotChoiceIfNotExistsThirdTurn()
        {
            if (!A2.Enabled && !C3.Enabled && B1.Enabled)
            {
                B1.Text = "O";
                B1.Enabled = false;
                return true;
            }
            if (!A2.Enabled && !C1.Enabled && B1.Enabled)
            {
                B1.Text = "O";
                B1.Enabled = false;
                return true;
            }
            if (!B1.Enabled && !C3.Enabled && C1.Enabled)
            {
                C1.Text = "O";
                C1.Enabled = false;
                return true;
            }
            if (!B1.Enabled && !A3.Enabled && A1.Enabled)
            {
                A1.Text = "O";
                A1.Enabled = false;
                return true;
            }
            if (!A2.Enabled && !B1.Enabled && A1.Enabled)
            {
                A1.Text = "O";
                A1.Enabled = false;
                return true;
            }
            if (!A2.Enabled && !B3.Enabled && A3.Enabled)
            {
                A3.Text = "O";
                A3.Enabled = false;
                return true;
            }
            if (!C2.Enabled && !B3.Enabled && C3.Enabled)
            {
                C3.Text = "O";
                C3.Enabled = false;
                return true;
            }
            if (!C2.Enabled && !B1.Enabled && C1.Enabled)
            {
                C1.Text = "O";
                C1.Enabled = false;
                return true;
            }
            if (B2.Enabled)
            {
                B2.Text = "O";
                B2.Enabled = false;
                return true;
            }
            if (A1.Text == "O" && C1.Enabled && B1.Enabled)
            {
                C1.Text = "O";
                C1.Enabled = false;
                return true;
            }
            if (A3.Text == "O" && B3.Enabled && C3.Enabled)
            {
                C3.Text = "O";
                C3.Enabled = false;
                return true;
            }
            return false;
        }
    }
}
