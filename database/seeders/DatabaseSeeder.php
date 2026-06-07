<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServiceFaq;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostTag;
use App\Models\Testimonial;
use App\Models\TeamMember;
use App\Models\CaseStudy;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Admin User ─────────────────────────────────
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@zentrixit.com',
            'password' => Hash::make('Admin@123'),
            'email_verified_at' => now(),
        ]);

        // ─── Services ───────────────────────────────────
        $services = [
            [
                'slug' => 'data-recovery',
                'title' => 'Data Recovery',
                'short_description' => 'HDD, SSD, Mobile, USB recovery from any failure scenario.',
                'long_description' => 'Lost data doesn\'t always mean lost forever. Our lab-grade recovery process retrieves what you thought was gone. We handle all types of storage media including hard drives, SSDs, mobile devices, USB drives, memory cards, and RAID arrays. Whether the failure is physical, logical, or caused by accidental deletion, our forensic-grade recovery tools and clean-room environment give your data the best chance of being recovered.',
                'icon' => 'database',
                'order' => 1,
                'features' => [
                    ['title' => 'Hard Drive Recovery', 'description' => 'Mechanical failure, head crash, motor failure recovery', 'icon' => 'hard-drive'],
                    ['title' => 'SSD Recovery', 'description' => 'Controller failure, firmware issues, NAND damage recovery', 'icon' => 'cpu'],
                    ['title' => 'Mobile Data Recovery', 'description' => 'Broken screen, water damage, deleted data recovery', 'icon' => 'smartphone'],
                    ['title' => 'USB/Flash Recovery', 'description' => 'Physical damage, file system corruption recovery', 'icon' => 'usb'],
                    ['title' => 'Memory Card Recovery', 'description' => 'SD, CF, microSD from cameras and drones', 'icon' => 'sd-card'],
                    ['title' => 'RAID Recovery', 'description' => 'RAID 0,1,5,6,10 array reconstruction', 'icon' => 'server'],
                ],
                'faqs' => [
                    ['question' => 'Is data recovery guaranteed?', 'answer' => 'Recovery depends on device condition and damage level. We offer a free evaluation and provide honest assessment before proceeding. If we can\'t recover your data, you don\'t pay for the recovery attempt.'],
                    ['question' => 'How long does data recovery take?', 'answer' => 'Standard recovery takes 3-7 business days. We offer urgent (24-48 hours) and emergency (same day) options for critical cases.'],
                    ['question' => 'What is the "No Recovery, No Fee" policy?', 'answer' => 'If we cannot recover your data, you pay nothing for the recovery attempt. A diagnostic evaluation fee may apply.'],
                    ['question' => 'Can you recover data from a formatted drive?', 'answer' => 'Yes, in most cases. Formatting doesn\'t immediately destroy data. The sooner you bring the device, the higher the chances of recovery.'],
                    ['question' => 'Do you offer remote data recovery?', 'answer' => 'For logical failures, remote recovery may be possible. For physical damage, the device needs to be physically examined in our lab.'],
                    ['question' => 'How do you deliver recovered data?', 'answer' => 'Recovered data is delivered on an encrypted external drive or via a secure download link, depending on data size and your preference.'],
                ],
            ],
            [
                'slug' => 'digital-forensics',
                'title' => 'Digital Forensics',
                'short_description' => 'Court-ready forensic examination of all electronic devices.',
                'long_description' => 'Professional forensic examination of electronic devices for legal, corporate, and personal matters. Our forensic process follows strict chain-of-custody protocols to ensure all evidence is admissible in court. We use industry-leading tools including FTK Imager, Cellebrite UFED, EnCase, and Autopsy for thorough examination of computers, mobile devices, and digital storage media.',
                'icon' => 'shield',
                'order' => 2,
                'features' => [
                    ['title' => 'Computer Forensics', 'description' => 'Full examination of desktops, laptops, and servers', 'icon' => 'monitor'],
                    ['title' => 'Mobile Device Forensics', 'description' => 'iOS, Android, feature phones, tablets analysis', 'icon' => 'smartphone'],
                    ['title' => 'Evidence Collection', 'description' => 'Court-admissible chain-of-custody documentation', 'icon' => 'file-text'],
                    ['title' => 'Metadata Analysis', 'description' => 'Deep metadata extraction and authentication', 'icon' => 'search'],
                    ['title' => 'Email Forensics', 'description' => 'Email header analysis, tracing, and authentication', 'icon' => 'mail'],
                    ['title' => 'Forensic Reporting', 'description' => 'Detailed court-ready reports with expert attestation', 'icon' => 'clipboard'],
                ],
                'faqs' => [
                    ['question' => 'Can your forensic reports be used in court?', 'answer' => 'Yes. Our reports follow chain-of-custody protocols, use hash verification, write-blockers, and are aligned with ISO/IEC 27037 standards.'],
                    ['question' => 'What devices can you examine?', 'answer' => 'We examine computers (Windows, Mac, Linux), mobile phones (iOS, Android), tablets, USB drives, memory cards, servers, and CCTV/NVR systems.'],
                    ['question' => 'How long does a forensic examination take?', 'answer' => 'Standard examinations take 5-10 business days. Express options of 48-72 hours and emergency 24-hour turnaround are available.'],
                    ['question' => 'Is the original device altered during examination?', 'answer' => 'No. We create bit-by-bit forensic images using write-blockers. The original device is never altered.'],
                    ['question' => 'Can you recover deleted data during forensic examination?', 'answer' => 'Yes. Our forensic tools can recover deleted files, browsing history, chat logs, emails, and other data artifacts.'],
                    ['question' => 'Do you provide expert testimony?', 'answer' => 'Yes. Our forensic analysts can provide expert testimony and court appearances when required.'],
                ],
            ],
            [
                'slug' => 'corporate-investigations',
                'title' => 'Corporate Investigations',
                'short_description' => 'Fraud, misconduct, and due diligence investigations.',
                'long_description' => 'Protect your business from internal threats, fraud, and operational risks. Our corporate investigation services cover employee misconduct, internal fraud, vendor verification, due diligence, and asset tracing. We gather admissible evidence while maintaining full legal compliance and employee privacy laws.',
                'icon' => 'briefcase',
                'order' => 3,
                'features' => [
                    ['title' => 'Internal Fraud Investigation', 'description' => 'Payroll fraud, procurement fraud, expense fraud detection', 'icon' => 'alert-triangle'],
                    ['title' => 'Employee Misconduct', 'description' => 'Data theft, harassment evidence, policy violations', 'icon' => 'user-x'],
                    ['title' => 'Due Diligence', 'description' => 'M&A, partnerships, key hire verification', 'icon' => 'check-circle'],
                    ['title' => 'Vendor Verification', 'description' => 'Supplier background checks and compliance verification', 'icon' => 'truck'],
                    ['title' => 'Asset Tracing', 'description' => 'Property, vehicle, financial asset verification', 'icon' => 'map-pin'],
                    ['title' => 'Corporate Risk Assessment', 'description' => 'Comprehensive organizational risk evaluation', 'icon' => 'shield'],
                ],
                'faqs' => [
                    ['question' => 'How do you maintain confidentiality?', 'answer' => 'Every case begins with a strict NDA. Only assigned investigators handle your case. All communications are encrypted.'],
                    ['question' => 'Is the evidence legally admissible?', 'answer' => 'Yes. All investigation evidence complies with the Indian IT Act 2000, IPC, and CrPC requirements.'],
                    ['question' => 'Do you offer retainer packages?', 'answer' => 'Yes. We offer Basic, Professional, and Enterprise retainer packages for ongoing corporate investigation needs.'],
                    ['question' => 'Can you investigate without the employee knowing?', 'answer' => 'Yes. Our investigations are conducted covertly to prevent evidence destruction while complying with all legal requirements.'],
                    ['question' => 'What industries do you serve?', 'answer' => 'We serve banking/finance, manufacturing, IT/tech, pharmaceuticals, real estate, retail, education, and healthcare sectors.'],
                    ['question' => 'How quickly can you start an investigation?', 'answer' => 'Emergency investigations can begin within hours of engagement. Standard cases typically start within 24-48 hours.'],
                ],
            ],
            [
                'slug' => 'background-verification',
                'title' => 'Background Verification',
                'short_description' => 'Employment, address, education, identity checks.',
                'long_description' => 'Know who you\'re trusting. Our comprehensive background verification services cover pre-employment screening, address verification, education credential checks, identity verification (Aadhaar, PAN), and reference checks. We serve both individual and corporate clients with DPDP Act 2023 compliant methodologies.',
                'icon' => 'user-check',
                'order' => 4,
                'features' => [
                    ['title' => 'Employment History Verification', 'description' => 'Verify past employment claims and references', 'icon' => 'briefcase'],
                    ['title' => 'Address Verification', 'description' => 'Physical address verification and confirmation', 'icon' => 'map-pin'],
                    ['title' => 'Education Verification', 'description' => 'Degree, diploma, and credential authentication', 'icon' => 'award'],
                    ['title' => 'Identity Verification', 'description' => 'Aadhaar, PAN, and government ID verification', 'icon' => 'credit-card'],
                    ['title' => 'Reference Checks', 'description' => 'Character and professional reference verification', 'icon' => 'users'],
                ],
                'faqs' => [
                    ['question' => 'How long does a background check take?', 'answer' => 'Standard checks take 2-5 business days. Express options are available for 24-48 hour turnaround.'],
                    ['question' => 'Do you need the subject\'s consent?', 'answer' => 'Subject consent is obtained wherever required by law, in compliance with the DPDP Act 2023.'],
                    ['question' => 'Do you offer bulk verification packages?', 'answer' => 'Yes. We offer special pricing for HR teams and staffing agencies verifying multiple candidates.'],
                    ['question' => 'What information do I need to provide?', 'answer' => 'Basic details of the person to verify: name, known address, and any documents they\'ve provided.'],
                    ['question' => 'Can you verify international credentials?', 'answer' => 'Yes, we can verify international education credentials and employment history through our partner network.'],
                    ['question' => 'Is the verification report legally valid?', 'answer' => 'Yes. Our verification reports are professionally structured and can be used for HR, legal, and compliance purposes.'],
                ],
            ],
            [
                'slug' => 'cyber-intelligence',
                'title' => 'Cyber Intelligence',
                'short_description' => 'OSINT, digital footprint, and risk intelligence.',
                'long_description' => 'Legal open-source intelligence gathering, digital footprint analysis, and online risk assessment. OSINT is the collection and analysis of information from publicly available sources — websites, social media, public records, databases — to build intelligence profiles and assess risks. No hacking. No illegal access. 100% legal.',
                'icon' => 'globe',
                'order' => 5,
                'features' => [
                    ['title' => 'Online Presence Analysis', 'description' => 'Social media, web mentions, leaked data analysis', 'icon' => 'globe'],
                    ['title' => 'Digital Footprint Assessment', 'description' => 'What information exists about you or your company', 'icon' => 'fingerprint'],
                    ['title' => 'Reputation Risk Assessment', 'description' => 'Negative content, defamation, fake profile detection', 'icon' => 'shield-off'],
                    ['title' => 'Public Record Research', 'description' => 'Court filings, company records, property searches', 'icon' => 'file-text'],
                    ['title' => 'Risk Intelligence', 'description' => 'Threat actors, competitive intelligence (legal)', 'icon' => 'alert-circle'],
                ],
                'faqs' => [
                    ['question' => 'Is OSINT legal?', 'answer' => 'Yes. OSINT only uses publicly available information. We do not access private systems, hack accounts, or use illegal methods.'],
                    ['question' => 'What sources do you use?', 'answer' => 'Publicly available sources including social media, websites, public records, court databases, news archives, and domain records.'],
                    ['question' => 'Can you monitor ongoing threats?', 'answer' => 'Yes. We offer corporate threat intelligence subscriptions for ongoing monitoring and risk assessment.'],
                    ['question' => 'Do you investigate the dark web?', 'answer' => 'We monitor indexed/public dark web mentions only. We do NOT engage with illegal marketplaces.'],
                    ['question' => 'What does a typical intelligence report include?', 'answer' => 'Executive summary, digital footprint map, risk score, detailed findings, and actionable recommendations.'],
                    ['question' => 'How is client privacy maintained?', 'answer' => 'All OSINT work is conducted under NDA. Your identity and the subject of investigation remain fully confidential.'],
                ],
            ],
            [
                'slug' => 'evidence-preservation',
                'title' => 'Evidence Preservation',
                'short_description' => 'Chain-of-custody documentation for legal proceedings.',
                'long_description' => 'When digital evidence needs to be preserved for legal proceedings, our evidence preservation services maintain full chain-of-custody documentation. Every piece of evidence is handled with strict protocols to ensure court admissibility. We create forensic images, hash-verified copies, and comprehensive documentation.',
                'icon' => 'lock',
                'order' => 6,
                'features' => [
                    ['title' => 'Forensic Imaging', 'description' => 'Bit-by-bit device cloning with hash verification', 'icon' => 'copy'],
                    ['title' => 'Chain of Custody', 'description' => 'Complete custody documentation from receipt to report', 'icon' => 'link'],
                    ['title' => 'Evidence Storage', 'description' => 'Secure storage of digital evidence with access logs', 'icon' => 'archive'],
                    ['title' => 'Court Preparation', 'description' => 'Evidence packaging for legal proceedings', 'icon' => 'folder'],
                    ['title' => 'Expert Attestation', 'description' => 'Professional attestation of evidence integrity', 'icon' => 'check-square'],
                ],
                'faqs' => [
                    ['question' => 'How quickly should evidence be preserved?', 'answer' => 'As soon as possible. Digital evidence can degrade, be overwritten, or lost. Contact us immediately when evidence preservation is needed.'],
                    ['question' => 'What devices can you preserve evidence from?', 'answer' => 'Any digital device: computers, phones, tablets, servers, CCTV systems, cloud accounts, and more.'],
                    ['question' => 'Is the preserved evidence court-admissible?', 'answer' => 'Yes. Our preservation process follows ISO/IEC 27037, uses write-blockers, hash verification, and maintains complete chain-of-custody.'],
                    ['question' => 'Can evidence be preserved remotely?', 'answer' => 'For cloud-based evidence and some digital assets, yes. Physical devices need to be examined on-site or at our lab.'],
                    ['question' => 'How long can you store preserved evidence?', 'answer' => 'We offer secure evidence storage for as long as needed. Storage terms are defined in the engagement agreement.'],
                    ['question' => 'What is hash verification?', 'answer' => 'Hash verification creates a mathematical fingerprint of the evidence, proving it has not been altered since preservation.'],
                ],
            ],
        ];

        foreach ($services as $serviceData) {
            $features = $serviceData['features'] ?? [];
            $faqs = $serviceData['faqs'] ?? [];
            unset($serviceData['features'], $serviceData['faqs']);

            $service = Service::create($serviceData);

            foreach ($features as $i => $feature) {
                $service->features()->create(array_merge($feature, ['order' => $i + 1]));
            }

            foreach ($faqs as $i => $faq) {
                $service->faqs()->create(array_merge($faq, ['order' => $i + 1]));
            }
        }

        // ─── Post Categories ────────────────────────────
        $categories = [
            PostCategory::create(['name' => 'Digital Forensics', 'slug' => 'digital-forensics', 'color' => '#1A4FBF']),
            PostCategory::create(['name' => 'Data Recovery', 'slug' => 'data-recovery', 'color' => '#00D4FF']),
            PostCategory::create(['name' => 'Cyber Intelligence', 'slug' => 'cyber-intelligence', 'color' => '#0F2E8C']),
            PostCategory::create(['name' => 'Corporate Security', 'slug' => 'corporate-security', 'color' => '#153FA6']),
        ];

        // ─── Post Tags ──────────────────────────────────
        $tags = [];
        foreach (['Digital Forensics', 'Data Recovery', 'OSINT', 'Background Verification', 'Evidence', 'Mobile Forensics', 'Corporate Fraud', 'Cybercrime', 'IT Act India'] as $tagName) {
            $tags[] = PostTag::create(['name' => $tagName, 'slug' => \Illuminate\Support\Str::slug($tagName)]);
        }

        // ─── Blog Posts ─────────────────────────────────
        Post::create([
            'slug' => 'how-to-preserve-digital-evidence',
            'title' => 'How to Preserve Digital Evidence: A Complete Guide',
            'excerpt' => 'Learn the critical steps to preserve digital evidence before it\'s too late. From device handling to chain-of-custody documentation.',
            'content' => '<h2>Why Evidence Preservation Matters</h2><p>Digital evidence is fragile. Every action taken on a device—turning it on, connecting to WiFi, or opening files—can permanently alter or destroy critical data. Whether you\'re dealing with employee misconduct, a legal dispute, or a cybercrime incident, proper evidence preservation is the first and most important step.</p><h2>The Golden Rule: Stop Using the Device</h2><p>The moment you suspect a device contains relevant evidence, stop using it immediately. Don\'t turn it off if it\'s on (it may be encrypted). Don\'t turn it on if it\'s off. Instead, contact a digital forensics professional.</p><h2>Steps to Preserve Digital Evidence</h2><ol><li><strong>Document Everything:</strong> Note the device\'s current state, who has had access, and when the issue was first noticed.</li><li><strong>Secure the Device:</strong> Place it in a safe location where no one can access or tamper with it.</li><li><strong>Don\'t Attempt DIY Recovery:</strong> Running recovery software on a damaged device can make things worse.</li><li><strong>Contact a Forensic Professional:</strong> A certified forensic examiner will use write-blockers and create forensic images.</li><li><strong>Maintain Chain of Custody:</strong> Document every person who handles the device and every action taken.</li></ol><h2>Common Mistakes That Destroy Evidence</h2><ul><li>Running the device after discovering an issue</li><li>Using consumer recovery software on failing drives</li><li>Forwarding suspicious emails (altering headers)</li><li>Taking screenshots instead of preserving original files</li><li>Allowing IT staff to "take a look" before forensics</li></ul><h2>When to Call a Professional</h2><p>If the evidence may be used in court, insurance claims, HR proceedings, or any legal matter—always engage a professional forensic examiner from the start. The cost of proper preservation is a fraction of the cost of losing critical evidence.</p>',
            'category_id' => $categories[0]->id,
            'author_id' => $admin->id,
            'post_type' => 'guide',
            'status' => 'published',
            'published_at' => now()->subDays(5),
            'meta_title' => 'How to Preserve Digital Evidence | Zentrix IT Solutions',
            'meta_description' => 'Complete guide on preserving digital evidence for legal proceedings. Learn the do\'s and don\'ts from forensic experts.',
        ]);

        Post::create([
            'slug' => 'understanding-data-recovery-process',
            'title' => 'What Happens During Professional Data Recovery?',
            'excerpt' => 'Ever wondered what goes on inside a data recovery lab? Here\'s a behind-the-scenes look at how professionals recover your lost data.',
            'content' => '<h2>The Data Recovery Process Explained</h2><p>When you bring a failed device to a professional data recovery lab, a systematic process begins. Unlike DIY software tools, professional recovery involves specialized hardware, clean-room environments, and years of expertise.</p><h2>Step 1: Initial Evaluation</h2><p>The device is logged, photographed, and catalogued. Serial numbers, model numbers, and physical condition are documented. This evaluation is typically free and takes 24 hours.</p><h2>Step 2: Diagnosis</h2><p>Using diagnostic tools, engineers determine the type and extent of failure—whether it\'s logical (software/firmware), physical (mechanical damage), or electronic (PCB/controller failure).</p><h2>Step 3: Recovery Strategy</h2><p>Based on the diagnosis, a recovery plan is created. This might involve firmware repair, head replacement, PCB transplant, or chip-off extraction for severely damaged devices.</p><h2>Step 4: Forensic Imaging</h2><p>Before any recovery attempt, a bit-by-bit forensic image is created using write-blockers. This ensures the original device is never modified.</p><h2>Step 5: Data Extraction</h2><p>Using specialized software (FTK Imager, R-Studio, PC-3000), engineers extract data from the forensic image. This process can take hours to days depending on the data volume.</p><h2>Step 6: Verification & Delivery</h2><p>Recovered files are verified for integrity. A file listing is provided for review. Once approved, data is delivered on encrypted media or via secure download.</p>',
            'category_id' => $categories[1]->id,
            'author_id' => $admin->id,
            'post_type' => 'blog',
            'status' => 'published',
            'published_at' => now()->subDays(12),
            'meta_title' => 'Professional Data Recovery Process | Zentrix IT Solutions',
            'meta_description' => 'Learn what happens during professional data recovery. Step-by-step guide from evaluation to data delivery.',
        ]);

        Post::create([
            'slug' => 'corporate-fraud-detection-digital-age',
            'title' => 'Detecting Corporate Fraud in the Digital Age',
            'excerpt' => 'How digital forensics is revolutionizing corporate fraud detection and investigation in Indian businesses.',
            'content' => '<h2>The Growing Threat of Corporate Fraud</h2><p>Corporate fraud costs Indian businesses an estimated ₹7,200 crore annually, according to industry reports. With increasing digitization, fraudsters are using sophisticated methods—but so are investigators.</p><h2>Common Types of Corporate Fraud</h2><ul><li><strong>Financial Statement Fraud:</strong> Manipulating revenue, assets, or liabilities</li><li><strong>Procurement Fraud:</strong> Vendor kickbacks, fake invoicing</li><li><strong>Payroll Fraud:</strong> Ghost employees, unauthorized overtime</li><li><strong>Data Theft:</strong> Stealing trade secrets, client databases</li><li><strong>Expense Fraud:</strong> Fabricated receipts, personal expenses billed</li></ul><h2>Digital Forensics: The Game Changer</h2><p>Digital forensics brings science to fraud investigation. By examining computers, emails, financial systems, and communication channels, investigators can build an irrefutable evidence trail.</p><h2>Red Flags That Trigger Investigations</h2><ol><li>Unusual data access patterns or large file transfers</li><li>Employees working odd hours without justification</li><li>Unexplained vendor payments or duplicate invoices</li><li>Resistance to audits or process changes</li><li>Lifestyle inconsistent with income level</li></ol><h2>Building a Fraud-Resilient Organization</h2><p>Prevention is always better than cure. Implement regular audits, access controls, whistleblower policies, and employee monitoring (within legal limits) to deter fraud before it happens.</p>',
            'category_id' => $categories[3]->id,
            'author_id' => $admin->id,
            'post_type' => 'blog',
            'status' => 'published',
            'published_at' => now()->subDays(20),
            'meta_title' => 'Corporate Fraud Detection Using Digital Forensics | Zentrix',
            'meta_description' => 'How digital forensics is transforming corporate fraud detection in India. Learn about red flags, investigation methods, and prevention.',
        ]);

        // ─── Case Studies ───────────────────────────────
        CaseStudy::create([
            'slug' => 'corporate-data-theft-investigation',
            'title' => 'Corporate Data Theft Investigation',
            'industry' => 'Corporate · Financial Fraud',
            'challenge' => 'Internal data theft suspected across 3 departments. A senior employee was believed to have exfiltrated sensitive client databases before resignation.',
            'solution' => 'Forensic imaging of company laptop revealed 47GB transferred to external drive 3 days before resignation. Email analysis showed communication with competitor.',
            'outcome' => 'Evidence presented in civil court. Employee\'s legal claims dropped. Company recovered ₹28 lakh in damages.',
            'is_featured' => true,
            'is_confidential' => true,
            'order' => 1,
        ]);

        CaseStudy::create([
            'slug' => 'critical-server-data-recovery',
            'title' => 'Critical Server Data Recovery',
            'industry' => 'Healthcare · Data Recovery',
            'challenge' => 'Hospital RAID-5 server with 4 drives suffered catastrophic failure. 3 years of patient records at risk. 2 drives had mechanical failure simultaneously.',
            'solution' => 'Emergency response within 2 hours. Clean-room head replacement on both failed drives. RAID array reconstruction and data extraction over 72 hours.',
            'outcome' => '99.7% of data recovered including all patient records. Hospital operational within 4 days.',
            'is_featured' => true,
            'is_confidential' => true,
            'order' => 2,
        ]);

        CaseStudy::create([
            'slug' => 'digital-evidence-matrimonial-dispute',
            'title' => 'Digital Evidence in Matrimonial Dispute',
            'industry' => 'Legal · Digital Forensics',
            'challenge' => 'Law firm needed to extract and preserve WhatsApp messages, financial transactions, and location data from a mobile device for a high-profile custody case.',
            'solution' => 'Cellebrite-based extraction with full chain-of-custody. Recovered 14 months of deleted WhatsApp conversations, call logs, and GPS location history.',
            'outcome' => 'Evidence was admitted in family court. Client received favorable judgment based on the forensic evidence presented.',
            'is_featured' => true,
            'is_confidential' => true,
            'order' => 3,
        ]);

        // ─── Testimonials ───────────────────────────────
        $testimonials = [
            [
                'name' => 'Advocate R. Sharma',
                'designation' => 'Senior Advocate',
                'company' => 'Sharma & Associates',
                'content' => 'Zentrix IT Solutions provided impeccable digital forensic services for our client\'s case. Their court-ready report was instrumental in securing a favorable judgment. The chain-of-custody documentation was thorough and professional.',
                'rating' => 5,
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'name' => 'Priya M.',
                'designation' => 'HR Director',
                'company' => 'Tech Company, Bangalore',
                'content' => 'We engaged Zentrix for an internal investigation involving suspected data theft. Their team was discreet, professional, and delivered concrete evidence within days. Highly recommended for corporate investigations.',
                'rating' => 5,
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'name' => 'Rajesh K.',
                'designation' => 'Business Owner',
                'company' => 'Manufacturing Firm',
                'content' => 'Lost critical business data from a failed hard drive. Zentrix recovered everything within 48 hours. Their "No Recovery, No Fee" policy gave us confidence. The team was transparent about the process throughout.',
                'rating' => 5,
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'name' => 'Meena S.',
                'designation' => 'Legal Counsel',
                'company' => 'Financial Institution',
                'content' => 'The background verification reports from Zentrix are thorough and reliable. We\'ve been using their services for pre-employment screening for over a year now. Their turnaround time is excellent.',
                'rating' => 4,
                'is_featured' => true,
                'order' => 4,
            ],
            [
                'name' => 'Anil T.',
                'designation' => 'CTO',
                'company' => 'Startup, Bangalore',
                'content' => 'After a suspected cyber attack, Zentrix\'s OSINT team helped us understand the extent of our exposure and provided actionable intelligence. Their professionalism and confidentiality are unmatched.',
                'rating' => 5,
                'is_featured' => true,
                'order' => 5,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // ─── Team Members ───────────────────────────────
        TeamMember::create(['name' => 'Lead Forensic Analyst', 'designation' => 'Lead Digital Forensics Analyst', 'bio' => 'Specialist in computer and mobile forensics with extensive experience in law enforcement and corporate investigations.', 'order' => 1, 'is_active' => true, 'show_public' => false]);
        TeamMember::create(['name' => 'Senior Data Recovery Engineer', 'designation' => 'Senior Data Recovery Engineer', 'bio' => 'Expert in HDD, SSD, and RAID recovery with clean-room experience and advanced firmware repair skills.', 'order' => 2, 'is_active' => true, 'show_public' => false]);
        TeamMember::create(['name' => 'OSINT Analyst', 'designation' => 'Cyber Intelligence Analyst', 'bio' => 'Certified OSINT professional with expertise in digital footprint analysis, threat intelligence, and public record research.', 'order' => 3, 'is_active' => true, 'show_public' => false]);
        TeamMember::create(['name' => 'Corporate Investigation Lead', 'designation' => 'Corporate Investigation Manager', 'bio' => 'Background in corporate security and fraud investigation with experience across banking, IT, and manufacturing sectors.', 'order' => 4, 'is_active' => true, 'show_public' => false]);

        // ─── Settings ───────────────────────────────────
        $settingsData = [
            // General
            ['key' => 'site_name', 'value' => 'Zentrix IT Solutions', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Digital Forensics · Data Recovery · Corporate Intelligence', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_email', 'value' => 'info@zentrixit.com', 'type' => 'text', 'group' => 'general'],
            ['key' => 'phone', 'value' => '+91 80 1234 5678', 'type' => 'text', 'group' => 'general'],
            ['key' => 'whatsapp', 'value' => '+919876543210', 'type' => 'text', 'group' => 'general'],
            ['key' => 'address', 'value' => 'Bangalore, Karnataka, India', 'type' => 'textarea', 'group' => 'general'],
            ['key' => 'business_hours', 'value' => 'Monday–Saturday: 9:00 AM – 7:00 PM', 'type' => 'text', 'group' => 'general'],
            // Social
            ['key' => 'facebook', 'value' => 'https://facebook.com/zentrixit', 'type' => 'text', 'group' => 'social'],
            ['key' => 'linkedin', 'value' => 'https://linkedin.com/company/zentrixit', 'type' => 'text', 'group' => 'social'],
            ['key' => 'twitter', 'value' => 'https://twitter.com/zentrixit', 'type' => 'text', 'group' => 'social'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/zentrixit', 'type' => 'text', 'group' => 'social'],
            // SEO
            ['key' => 'meta_description', 'value' => 'Zentrix IT Solutions – Bangalore\'s trusted digital forensics, data recovery, corporate investigation, and cyber intelligence company.', 'type' => 'textarea', 'group' => 'seo'],
            ['key' => 'og_image', 'value' => '', 'type' => 'image', 'group' => 'seo'],
            // Google
            ['key' => 'google_maps_embed', 'value' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452925042!3d12.954517009617921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen loading="lazy"></iframe>', 'type' => 'textarea', 'group' => 'google'],
            ['key' => 'analytics_id', 'value' => '', 'type' => 'text', 'group' => 'google'],
            ['key' => 'recaptcha_site_key', 'value' => '', 'type' => 'text', 'group' => 'google'],
            ['key' => 'recaptcha_secret_key', 'value' => '', 'type' => 'text', 'group' => 'google'],
        ];

        foreach ($settingsData as $setting) {
            Setting::create($setting);
        }

        // ─── Global FAQs ────────────────────────────────
        $globalFaqs = [
            ['question' => 'Is data recovery guaranteed?', 'answer' => 'Recovery depends on device condition, damage level, and time elapsed. We offer a free evaluation and provide an honest assessment before proceeding.'],
            ['question' => 'Are your investigations legal and ethical?', 'answer' => 'Yes. All services follow the Indian IT Act 2000, IPC, CrPC, and the DPDP Act 2023. We never use illegal methods.'],
            ['question' => 'Is my information kept confidential?', 'answer' => 'Absolutely. Every case is handled under strict NDA. Your identity and case details are never disclosed to any third party.'],
            ['question' => 'Do you work with businesses and law firms?', 'answer' => 'Yes. We have dedicated corporate investigation services and work extensively with law firms, HR departments, and businesses.'],
            ['question' => 'Can your forensic reports be used in court?', 'answer' => 'Yes. Our reports follow chain-of-custody protocols and are designed to be court-admissible under Indian evidence laws.'],
            ['question' => 'What is your typical turnaround time?', 'answer' => 'Depends on the service and complexity. Standard cases: 3-10 days. Urgent: 24-72 hours. Emergency: Same day available.'],
        ];

        foreach ($globalFaqs as $i => $faq) {
            \App\Models\Faq::create(array_merge($faq, [
                'is_active' => true,
                'sort_order' => $i + 1,
            ]));
        }
    }
}
