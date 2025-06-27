# PE Fund Research - Private Equity Intelligence Platform

A comprehensive web application for researching private equity funds using AI-powered analysis. Get detailed information about PE funds including investment thesis, team members, fund strategies, and recent deals.

## Features

🔍 **Comprehensive Fund Research**
- Fund details (name, address, contact information)
- Investment thesis and strategy analysis
- Fund portfolio and AUM information
- Key team members and leadership
- Recent deals and investments (last 3 years)

🤖 **AI-Powered Analysis**
- Perplexity AI for real-time web search and data gathering
- OpenAI GPT-4 for intelligent report generation and structuring
- Parallel processing for faster research results

🎨 **Modern UI/UX**
- Beautiful, responsive design with Tailwind CSS
- Interactive fund reports with organized sections
- Real-time search with loading states
- Professional styling with gradient backgrounds

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **AI Integration**: OpenAI GPT-4, Perplexity AI
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Perplexity API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pe-fund-research
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # API Keys
   OPENAI_API_KEY=sk-your-openai-api-key-here
   PERPLEXITY_API_KEY=pplx-your-perplexity-api-key-here
   
   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here
   ```

4. **Get API Keys**

   **OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in to your account
   - Create a new API key
   - Copy the key to your `.env.local` file

   **Perplexity API Key:**
   - Visit [Perplexity AI](https://www.perplexity.ai/)
   - Sign up for an account
   - Navigate to API settings
   - Generate an API key
   - Copy the key to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Search for a Fund**
   - Enter the name of a private equity fund (e.g., "KKR", "Blackstone", "Apollo")
   - Click "Research" or press Enter

2. **View Comprehensive Report**
   - Fund details and contact information
   - Investment thesis and strategy
   - Fund portfolio with sizes and strategies
   - Key team members with backgrounds
   - Recent deals and investments

3. **Export or Share**
   - Reports are displayed in a clean, professional format
   - Perfect for research, presentations, or analysis

## Example Searches

Try searching for these well-known private equity funds:
- KKR
- Blackstone
- Apollo Global Management
- Carlyle Group
- Warburg Pincus
- TPG
- Bain Capital
- Vista Equity Partners

## API Endpoints

### POST /api/research-fund

Research a private equity fund and return comprehensive data.

**Request Body:**
```json
{
  "fundName": "KKR"
}
```

**Response:**
```json
{
  "fundName": "KKR & Co. Inc.",
  "address": "9 West 57th Street, New York, NY 10019",
  "contactEmail": "info@kkr.com",
  "investmentThesis": "KKR focuses on leveraged buyouts, growth equity, and credit investments across multiple sectors...",
  "funds": [...],
  "teamMembers": [...],
  "recentDeals": [...]
}
```

## Project Structure

```
pe-fund-research/
├── app/
│   ├── api/
│   │   └── research-fund/
│   │       └── route.ts          # API endpoint for fund research
│   │   ├── components/
│   │   │   └── FundReport.tsx        # Fund report display component
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main homepage
│   ├── package.json                  # Dependencies and scripts
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── README.md                     # This file
```

## Deployment

### Vercel (Recommended)

1. Fork this repository to your GitHub account
2. Connect your GitHub account to Vercel
3. Import the project from GitHub
4. Add environment variables in Vercel dashboard
5. Deploy

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for GPT-4 report generation |
| `PERPLEXITY_API_KEY` | Yes | Perplexity AI API key for web search |
| `NEXTAUTH_URL` | No | Base URL for the application |
| `NEXTAUTH_SECRET` | No | Secret key for session encryption |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section below
2. Open an issue on GitHub
3. Contact the development team

## Troubleshooting

### Common Issues

**API Keys Not Working:**
- Ensure your API keys are correctly set in `.env.local`
- Verify your OpenAI account has sufficient credits
- Check that your Perplexity API key is active

**Build Errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18 or higher
- Clear Next.js cache: `rm -rf .next`

**Search Results Empty:**
- Try different fund names or variations
- Check API key permissions and limits
- Verify network connectivity

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for detailed error messages
- Monitor API usage to avoid rate limits
- Test with well-known funds first

## Roadmap

Future features planned:
- [ ] Fund comparison functionality
- [ ] Historical performance data
- [ ] Sector analysis and trends
- [ ] Export to PDF/Excel
- [ ] User authentication and saved searches
- [ ] Real-time fund news and updates
- [ ] Advanced filtering and search options 