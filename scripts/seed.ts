
import { PrismaClient, TradeType } from '../app/node_modules/.prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create test user (required for testing)
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
      subscriptionTier: 'PRO',
    },
  })

  console.log('✅ Test user created:', testUser.email)

  // Create business settings for test user
  await prisma.businessSettings.upsert({
    where: { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      companyName: 'John Doe Trades',
      address: '123 Trade Street, Sydney NSW 2000',
      phone: '+61 400 123 456',
      email: 'john@doe.com',
      abn: '12 345 678 901',
      customBranding: true,
    },
  })

  // Create system templates for different trades
  const templates = [
    {
      name: 'Basic Concrete Slab',
      tradeType: TradeType.CONCRETE,
      description: 'Standard concrete slab installation with reinforcement',
      defaultRate: 85.0,
      defaultMarkup: 25.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Site preparation', 'Concrete supply', 'Steel reinforcement', 'Finishing'],
        extras: ['Exposed aggregate finish', 'Colored concrete', 'Extra thickness'],
      },
    },
    {
      name: 'Concrete Driveway',
      tradeType: TradeType.CONCRETE,
      description: 'Residential driveway with decorative finish options',
      defaultRate: 95.0,
      defaultMarkup: 30.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Excavation', 'Base preparation', 'Concrete pour', 'Broom finish'],
        extras: ['Exposed aggregate', 'Stamped concrete', 'Sealing'],
      },
    },
    {
      name: 'Ceramic Floor Tiling',
      tradeType: TradeType.TILING,
      description: 'Standard ceramic tile installation for floors',
      defaultRate: 55.0,
      defaultMarkup: 35.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Surface preparation', 'Adhesive', 'Grout', 'Cleaning'],
        extras: ['Waterproofing', 'Tile trim', 'Premium grout'],
      },
    },
    {
      name: 'Bathroom Wall Tiling',
      tradeType: TradeType.TILING,
      description: 'Bathroom wall tiling with waterproofing',
      defaultRate: 65.0,
      defaultMarkup: 40.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Waterproof membrane', 'Wall preparation', 'Tile installation', 'Sealing'],
        extras: ['Feature tiles', 'Niches', 'Tile trim upgrades'],
      },
    },
    {
      name: 'Interior House Painting',
      tradeType: TradeType.PAINTING,
      description: 'Complete interior painting service',
      defaultRate: 25.0,
      defaultMarkup: 45.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Surface preparation', 'Primer', '2 coats paint', 'Drop sheets'],
        extras: ['Ceiling painting', 'Trim painting', 'Premium paint'],
      },
    },
    {
      name: 'Exterior House Painting',
      tradeType: TradeType.PAINTING,
      description: 'External house painting with weather protection',
      defaultRate: 35.0,
      defaultMarkup: 40.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Pressure washing', 'Repairs', 'Primer', 'Weather-resistant paint'],
        extras: ['Roof painting', 'Gutter painting', 'Window frame painting'],
      },
    },
    {
      name: 'Garden Landscaping',
      tradeType: TradeType.LANDSCAPING,
      description: 'Complete garden design and installation',
      defaultRate: 75.0,
      defaultMarkup: 50.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Design consultation', 'Soil preparation', 'Plant installation', 'Mulching'],
        extras: ['Irrigation system', 'Garden lighting', 'Water features'],
      },
    },
    {
      name: 'Lawn Installation',
      tradeType: TradeType.LANDSCAPING,
      description: 'Turf supply and installation',
      defaultRate: 35.0,
      defaultMarkup: 30.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Site preparation', 'Soil conditioning', 'Turf supply', 'Installation'],
        extras: ['Sprinkler system', 'Edging', 'Initial fertilizing'],
      },
    },
    {
      name: 'Home Extension',
      tradeType: TradeType.BUILDING,
      description: 'Residential building extension',
      defaultRate: 2500.0,
      defaultMarkup: 20.0,
      isSystemTemplate: true,
      configuration: {
        units: 'm²',
        includes: ['Permits', 'Foundation', 'Framing', 'Roofing', 'Basic finishes'],
        extras: ['Premium finishes', 'Electrical upgrade', 'Plumbing'],
      },
    },
    {
      name: 'Bathroom Renovation',
      tradeType: TradeType.BUILDING,
      description: 'Complete bathroom renovation',
      defaultRate: 15000.0,
      defaultMarkup: 25.0,
      isSystemTemplate: true,
      configuration: {
        units: 'room',
        includes: ['Demolition', 'Plumbing', 'Electrical', 'Tiling', 'Fixtures'],
        extras: ['Premium fixtures', 'Heated floors', 'Custom vanity'],
      },
    },
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: { 
        id: `${template.tradeType.toLowerCase()}-${template.name.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        id: `${template.tradeType.toLowerCase()}-${template.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...template,
      },
    })
  }

  console.log('✅ System templates created')

  // Create a sample quote for the test user
  const sampleQuote = await prisma.quote.upsert({
    where: { quoteNumber: 'QUO-001' },
    update: {},
    create: {
      quoteNumber: 'QUO-001',
      userId: testUser.id,
      jobTitle: 'Backyard Concrete Slab',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      clientPhone: '+61 400 987 654',
      clientAddress: '456 Client Street, Melbourne VIC 3000',
      tradeType: TradeType.CONCRETE,
      templateId: 'concrete-basic-concrete-slab',
      measurements: {
        length: 6,
        width: 4,
        thickness: 0.1,
      },
      baseRate: 85.0,
      area: 24.0,
      baseCost: 2040.0,
      markupPercentage: 25.0,
      markupAmount: 510.0,
      extras: [
        { name: 'Exposed aggregate finish', cost: 300.0 },
        { name: 'Extra reinforcement', cost: 150.0 },
      ],
      subtotal: 3000.0,
      gstAmount: 300.0,
      totalAmount: 3300.0,
      notes: 'Client wants exposed aggregate finish with decorative border.',
      status: 'DRAFT',
    },
  })

  console.log('✅ Sample quote created:', sampleQuote.quoteNumber)

  console.log('🎉 Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
