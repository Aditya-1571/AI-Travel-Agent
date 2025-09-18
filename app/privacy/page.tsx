"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Shield, MapPin, Database, Eye, EyeOff, Info } from "lucide-react"

export default function PrivacyPage() {
  const [privacySettings, setPrivacySettings] = useState({
    dataAnonymization: true,
    gridSize: 100,
    shareData: false,
    localProcessing: true,
    dataRetention: 30,
  })

  const updateSetting = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const getGridDescription = (size: number) => {
    if (size <= 50) return "High precision (50m blocks)"
    if (size <= 100) return "Balanced (100m blocks)"
    if (size <= 200) return "Good privacy (200m blocks)"
    return "Maximum privacy (500m blocks)"
  }

  const getPrivacyLevel = () => {
    let score = 0
    if (privacySettings.dataAnonymization) score += 25
    if (privacySettings.gridSize >= 200) score += 25
    if (!privacySettings.shareData) score += 25
    if (privacySettings.localProcessing) score += 25

    if (score >= 75) return { level: "High", color: "text-green-500" }
    if (score >= 50) return { level: "Medium", color: "text-yellow-500" }
    return { level: "Low", color: "text-red-500" }
  }

  const privacy = getPrivacyLevel()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Settings</h1>
        <p className="text-muted-foreground">Control how your travel data is collected and processed</p>
      </div>

      {/* Privacy Level Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Level
          </CardTitle>
          <CardDescription>Your current privacy protection level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl font-bold ${privacy.color}`}>{privacy.level}</div>
              <div className="text-sm text-muted-foreground">Based on your current settings</div>
            </div>
            <Badge variant="outline" className={privacy.color}>
              <Shield className="h-4 w-4 mr-1" />
              {privacy.level} Protection
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data Anonymization */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Anonymization
          </CardTitle>
          <CardDescription>Protect your exact location by rounding GPS coordinates to grid blocks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="anonymization">Enable Data Anonymization</Label>
              <p className="text-sm text-muted-foreground">
                Your exact GPS location will be rounded to protect privacy
              </p>
            </div>
            <Switch
              id="anonymization"
              checked={privacySettings.dataAnonymization}
              onCheckedChange={(checked) => updateSetting("dataAnonymization", checked)}
            />
          </div>

          {privacySettings.dataAnonymization && (
            <div className="space-y-4">
              <div>
                <Label>Grid Size: {privacySettings.gridSize}m</Label>
                <p className="text-sm text-muted-foreground mb-2">{getGridDescription(privacySettings.gridSize)}</p>
                <Slider
                  value={[privacySettings.gridSize]}
                  onValueChange={(value) => updateSetting("gridSize", value[0])}
                  max={500}
                  min={50}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">How it works:</p>
                    <p className="text-muted-foreground">
                      Instead of saving your exact GPS coordinates, we round them to the nearest
                      {privacySettings.gridSize}m grid block. This protects your privacy while still allowing accurate
                      trip analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Processing */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Processing
          </CardTitle>
          <CardDescription>Control where and how your data is processed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="local-processing">Local Processing</Label>
              <p className="text-sm text-muted-foreground">Process data on your device before uploading</p>
            </div>
            <Switch
              id="local-processing"
              checked={privacySettings.localProcessing}
              onCheckedChange={(checked) => updateSetting("localProcessing", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="share-data">Share Anonymous Data</Label>
              <p className="text-sm text-muted-foreground">Help improve our AI by sharing anonymized trip patterns</p>
            </div>
            <Switch
              id="share-data"
              checked={privacySettings.shareData}
              onCheckedChange={(checked) => updateSetting("shareData", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Data Retention
          </CardTitle>
          <CardDescription>How long we keep your travel data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Delete data after: {privacySettings.dataRetention} days</Label>
            <p className="text-sm text-muted-foreground mb-2">Automatically delete your trip data after this period</p>
            <Slider
              value={[privacySettings.dataRetention]}
              onValueChange={(value) => updateSetting("dataRetention", value[0])}
              max={365}
              min={7}
              step={7}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <EyeOff className="h-4 w-4 mr-2" />
              Delete All Data Now
            </Button>
            <Button variant="outline" size="sm">
              Export My Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button>Save Privacy Settings</Button>
      </div>
    </div>
  )
}
