using System;
using System.Windows.Forms;

namespace TicTacToe
{
    public partial class Form1 : Form
    {
        private bool playWithPlayer = false;
        private bool Turn = true;
        private bool Winner = false;
        private int TurnCount = 0;

        public Form1()
        {
            InitializeComponent();
        }

        private void aboutToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("To start game with bot click \"Game -> New game with bot\"\nTo start play alternately click \"Game -> New game\"\nIf you wanna end game click \"Game -> End game\"\nCreated by me", "About");
        }

        private void endGameToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button_click(object sender, EventArgs e)
        {
            if(playWithPlayer)
            {
                button_click1(sender, e);
                return;
            }
            var button = (Button)sender;
            button.Text = "X";
            button.Enabled = false;
            TurnCount++;
            Winner = checkForWinner();
            if (!Winner)
            {
                MakeMove(sender, e, TurnCount);
                TurnCount++;
                Winner = checkForWinner();
            }
        }

        private void button_click1(object sender, EventArgs e)
        {
            var button = (Button)sender;
            if (Turn)
            {
                button.Text = "X";
                button.Enabled = false;
                Turn = !Turn;
            }
            else
            {
                button.Text = "O";
                button.Enabled = false;
                Turn = !Turn;
            }
            TurnCount++;
            Winner = checkForWinner();
        }

        private bool checkForWinner()
        {
            var endOfGame = false;
            var text = "";

            if (A1.Text == A2.Text && A2.Text == A3.Text && !A1.Enabled)
            {
                endOfGame = true;
                text = A1.Text;
            }
            if (B1.Text == B2.Text && B2.Text == B3.Text && !B1.Enabled)
            {
                endOfGame = true;
                text = B1.Text;
            }
            if (C1.Text == C2.Text && C2.Text == C3.Text && !C1.Enabled)
            {
                endOfGame = true;
                text = C1.Text;
            }
            if (A1.Text == B1.Text && B1.Text == C1.Text && !A1.Enabled)
            {
                endOfGame = true;
                text = A1.Text;
            }
            if (A2.Text == B2.Text && B2.Text == C2.Text && !A2.Enabled)
            {
                endOfGame = true;
                text = A2.Text;
            }
            if (A3.Text == B3.Text && B3.Text == C3.Text && !A3.Enabled)
            {
                endOfGame = true;
                text = A3.Text;
            }
            if (A1.Text == B2.Text && B2.Text == C3.Text && !A1.Enabled)
            {
                endOfGame = true;
                text = A1.Text;
            }
            if (A3.Text == B2.Text && B2.Text == C1.Text && !A3.Enabled)
            {
                endOfGame = true;
                text = A3.Text;
            }
            if (endOfGame)
            {
                MessageBox.Show("Winner is " + text, "END OF GAME");
                disableButtons(new object(), new EventArgs());
                return true;
            }
            if (TurnCount == 9 && !endOfGame)
            {
                MessageBox.Show("No one won!", "END OF GAME");
                return true;
            }
            return false;
        }

        private void enableButtons(object sender, EventArgs e)
        {
            try
            {
                playWithPlayer = false;
                Winner = false;
                TurnCount = 0;
                Turn = true;
                foreach (var c in Controls)
                {
                    var button = (Button)c;
                    button.Enabled = true;
                    button.Text = default(string);
                }
            }
            catch
            {

            }
        }

        private void enableButtons1(object sender, EventArgs e)
        {
            try
            {
                playWithPlayer = true;
                Winner = false;
                TurnCount = 0;
                Turn = true;
                foreach (var c in Controls)
                {
                    var button = (Button)c;
                    button.Enabled = true;
                    button.Text = default(string);
                }
            }
            catch
            {

            }
        }

        private void disableButtons(object sender, EventArgs e)
        {
            try
            {
                playWithPlayer = false;
                Winner = false;
                TurnCount = 0;
                Turn = true;
                foreach (var c in Controls)
                {
                    var button = (Button)c;
                    button.Enabled = false;
                }
            }
            catch
            {

            }
        }
    }
}
