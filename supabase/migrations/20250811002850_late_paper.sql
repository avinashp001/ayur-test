/*
  # Create blogs table and analytics functions

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text)
      - `excerpt` (text)
      - `slug` (text, unique, required)
      - `meta_title` (text)
      - `meta_description` (text)
      - `keywords` (text array)
      - `featured_image` (text)
      - `author` (text)
      - `published` (boolean, default false)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)
      - `views` (integer, default 0)
      - `likes` (integer, default 0)
      - `reading_time` (integer, default 0)
      - `category` (text)

  2. Security
    - Enable RLS on `blogs` table
    - Add policy for public read access to published blogs
    - Add policy for authenticated users to manage all blogs

  3. Functions
    - `increment_blog_views` function to safely increment view count
    - `increment_blog_likes` function to safely increment like count
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  excerpt text,
  slug text UNIQUE NOT NULL,
  meta_title text,
  meta_description text,
  keywords text[],
  featured_image text,
  author text,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  reading_time integer DEFAULT 0,
  category text
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published blogs
CREATE POLICY "Public can read published blogs"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Create policy for authenticated users to manage all blogs
CREATE POLICY "Authenticated users can manage blogs"
  ON blogs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment blog likes
CREATE OR REPLACE FUNCTION increment_blog_likes(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs SET likes = likes + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some sample data for testing
INSERT INTO blogs (title, content, excerpt, slug, meta_title, meta_description, keywords, featured_image, author, published, published_at, category, reading_time) VALUES
(
  'The Ancient Wisdom of Ayurveda: A Modern Approach to Holistic Health',
  '# The Ancient Wisdom of Ayurveda

Ayurveda, the "science of life," is one of the world''s oldest healing systems. Originating in India over 5,000 years ago, this holistic approach to health and wellness focuses on achieving balance between mind, body, and spirit.

## Understanding Your Dosha

In Ayurveda, every individual has a unique constitution called a dosha. There are three primary doshas:

- **Vata**: Associated with air and space elements
- **Pitta**: Associated with fire and water elements  
- **Kapha**: Associated with earth and water elements

## Modern Applications

Today, Ayurvedic principles can be integrated into modern lifestyle practices through:

1. Mindful eating according to your dosha
2. Daily routines that align with natural rhythms
3. Herbal remedies and natural treatments
4. Meditation and yoga practices

By understanding and working with your natural constitution, you can achieve optimal health and vitality.',
  'Discover how ancient Ayurvedic wisdom can transform your modern approach to health and wellness through personalized dosha-based practices.',
  'ancient-wisdom-ayurveda-modern-approach',
  'The Ancient Wisdom of Ayurveda: A Modern Approach to Holistic Health',
  'Learn how to integrate 5,000-year-old Ayurvedic principles into your modern lifestyle for optimal health, balance, and wellness.',
  ARRAY['ayurveda', 'holistic health', 'dosha', 'wellness', 'ancient wisdom', 'natural healing'],
  'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg',
  'Dr. Priya Sharma',
  true,
  now() - interval '2 days',
  'ayurveda',
  8
),
(
  'Mindfulness and Mental Health: Breaking the Stigma',
  '# Mindfulness and Mental Health

Mental health awareness has grown significantly in recent years, yet stigma still prevents many from seeking help. Mindfulness practices offer accessible tools for mental wellness.

## The Power of Present Moment Awareness

Mindfulness teaches us to:
- Observe thoughts without judgment
- Reduce anxiety and stress
- Improve emotional regulation
- Enhance overall well-being

## Simple Daily Practices

Start with these beginner-friendly techniques:

1. **5-Minute Morning Meditation**
2. **Mindful Breathing Exercises**
3. **Body Scan Relaxation**
4. **Gratitude Journaling**

Remember, seeking help is a sign of strength, not weakness.',
  'Explore how mindfulness practices can support mental health and help break down the barriers that prevent people from seeking help.',
  'mindfulness-mental-health-breaking-stigma',
  'Mindfulness and Mental Health: Breaking the Stigma',
  'Discover powerful mindfulness techniques for mental wellness and learn how to overcome stigma around mental health support.',
  ARRAY['mindfulness', 'mental health', 'meditation', 'anxiety', 'stress relief', 'wellness'],
  'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg',
  'Dr. Sarah Johnson',
  true,
  now() - interval '1 day',
  'mental-health',
  6
),
(
  'Nutritional Healing: Foods as Medicine in Ayurvedic Practice',
  '# Nutritional Healing Through Ayurveda

In Ayurvedic tradition, food is considered medicine. The ancient saying "Let food be thy medicine" reflects the profound understanding that what we eat directly impacts our health and vitality.

## The Six Tastes

Ayurveda recognizes six tastes, each with specific healing properties:

- **Sweet (Madhura)**: Nourishing and grounding
- **Sour (Amla)**: Stimulating and warming
- **Salty (Lavana)**: Hydrating and grounding
- **Pungent (Katu)**: Heating and stimulating
- **Bitter (Tikta)**: Cooling and detoxifying
- **Astringent (Kashaya)**: Cooling and drying

## Eating for Your Dosha

### Vata-Pacifying Foods
- Warm, cooked foods
- Healthy fats and oils
- Sweet, sour, and salty tastes

### Pitta-Pacifying Foods
- Cool, refreshing foods
- Sweet, bitter, and astringent tastes
- Avoid spicy and acidic foods

### Kapha-Pacifying Foods
- Light, warm foods
- Pungent, bitter, and astringent tastes
- Minimize heavy, oily foods

## Seasonal Eating

Align your diet with the seasons for optimal health and digestion.',
  'Learn how Ayurvedic principles transform food into medicine through the six tastes and dosha-specific nutrition.',
  'nutritional-healing-foods-medicine-ayurveda',
  'Nutritional Healing: Foods as Medicine in Ayurvedic Practice',
  'Discover how to use food as medicine through Ayurvedic nutrition principles, the six tastes, and dosha-specific eating.',
  ARRAY['ayurvedic nutrition', 'food as medicine', 'dosha diet', 'healing foods', 'holistic nutrition'],
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  'Chef Ananda Devi',
  true,
  now() - interval '3 days',
  'nutrition',
  10
),
(
  'Yoga Beyond Asanas: The Eight Limbs of Yogic Philosophy',
  '# The Complete Path of Yoga

While many people associate yoga with physical postures (asanas), traditional yoga encompasses a comprehensive philosophy for living outlined in Patanjali''s eight limbs of yoga.

## The Eight Limbs (Ashtanga)

### 1. Yamas (Ethical Restraints)
- **Ahimsa**: Non-violence
- **Satya**: Truthfulness
- **Asteya**: Non-stealing
- **Brahmacharya**: Energy conservation
- **Aparigraha**: Non-possessiveness

### 2. Niyamas (Observances)
- **Saucha**: Cleanliness
- **Santosha**: Contentment
- **Tapas**: Disciplined practice
- **Svadhyaya**: Self-study
- **Ishvara Pranidhana**: Surrender to the divine

### 3. Asana (Physical Postures)
The physical practice that prepares the body for meditation.

### 4. Pranayama (Breath Control)
Techniques to regulate and extend the life force through breathing.

### 5. Pratyahara (Withdrawal of Senses)
Drawing attention inward, away from external distractions.

### 6. Dharana (Concentration)
Focused attention on a single object or concept.

### 7. Dhyana (Meditation)
Sustained awareness and uninterrupted flow of consciousness.

### 8. Samadhi (Union/Enlightenment)
The ultimate goal of yoga - complete absorption and unity.

## Integrating the Eight Limbs

Living yoga means embodying these principles both on and off the mat.',
  'Explore the complete philosophy of yoga through Patanjali''s eight limbs and discover how to integrate these ancient teachings into modern life.',
  'yoga-beyond-asanas-eight-limbs-philosophy',
  'Yoga Beyond Asanas: The Eight Limbs of Yogic Philosophy',
  'Discover the complete path of yoga through Patanjali''s eight limbs and learn to integrate ancient yogic philosophy into daily life.',
  ARRAY['yoga philosophy', 'eight limbs', 'Patanjali', 'yogic lifestyle', 'meditation', 'spiritual practice'],
  'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
  'Yogi Ramesh Kumar',
  true,
  now() - interval '4 days',
  'yoga',
  12
);